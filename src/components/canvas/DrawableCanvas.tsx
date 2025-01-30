//DrawableCanvas.tsx
//"use client";
import React, { useEffect, useRef } from "react"
import { fabric } from "fabric"
import CanvasToolbar from "./CanvasToolbar"
import { useCanvasState } from "./DrawableCanvasState"
import { tools, FabricTool } from "./lib"
import {
  downloadCallback,
  downloadCallback4Json,
  logCanvasData,
} from "./helpers"
import { customBackground2 } from "./constants"
//import { useCanvasStore } from "./useCanvasStore"

export interface ComponentArgs {
  index: number
  fillColor: string
  strokeWidth: number
  strokeColor: string
  backgroundColor: string
  backgroundImageURL: string
  canvasWidth: number
  canvasHeight: number
  drawingMode: string
  initialDrawing: Object
  displayToolbar: boolean
  displayRadius: number
  scaleFactors: number[]
}

const DrawableCanvas = ({
  index,
  fillColor,
  strokeWidth,
  strokeColor,
  backgroundColor,
  backgroundImageURL,
  canvasWidth,
  canvasHeight,
  drawingMode,
  initialDrawing,
  displayToolbar,
  displayRadius,
  scaleFactors,
}: ComponentArgs) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasInstance = useRef<fabric.Canvas | null>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasInstance = useRef<fabric.StaticCanvas | null>(null)

  // const save2Storage = () => {
  //   if (canvasInstance.current && backgroundCanvasInstance.current) {
  //     //if (canvasInstance.current) {
  //     const canvasData = []

  //     // Collect background canvas data if needed
  //     if (backgroundCanvasInstance.current) {
  //       const backgroundData = backgroundCanvasInstance.current.toJSON() // Assuming Fabric.js
  //       canvasData.push({ background: backgroundData })
  //     }

  //     // Collect main canvas data
  //     if (canvasInstance.current) {
  //       const mainCanvasData = canvasInstance.current.toJSON() // Assuming Fabric.js
  //       canvasData.push({ mainCanvas: mainCanvasData })
  //     }

  //     // Save the canvas data to localStorage
  //     try {
  //       //localStorage.setItem("canvasData", JSON.stringify(canvasData));
  //       //setCurrentState(canvasData)
  //       console.log(
  //         "Canvas data saved to localStorage and/or currentState in DrawableCanvas.tsx: ",
  //         canvasData
  //       )
  //     } catch (e) {
  //       console.error("Error saving canvas data to localStorage:", e)
  //     }
  //   } else {
  //     console.error("Canvas instances not found.")
  //   }
  // }

  const {
    canvasState: {
      action: { shouldReloadCanvas },
      currentState,
      initialState,
    },
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    resetState,
  } = useCanvasState()

  // const setCurrentState = useCanvasStore(
  //   (state: { setCurrentState: (state: any) => void }) => state.setCurrentState
  // )

  useEffect(() => {
    if (canvasRef.current) {
      canvasInstance.current = new fabric.Canvas(canvasRef.current, {
        enableRetinaScaling: false,
      })

      // Load initial drawing only once
      canvasInstance.current.loadFromJSON(initialDrawing, () => {
        canvasInstance.current?.renderAll()
        resetState(initialDrawing)
      })
    }

    if (backgroundCanvasRef.current) {
      backgroundCanvasInstance.current = new fabric.StaticCanvas(
        backgroundCanvasRef.current,
        {
          enableRetinaScaling: false,
        }
      )

      // const rect = customBackground(canvasWidth, canvasHeight);
      // backgroundCanvasInstance.current.add(rect);
      // backgroundCanvasInstance.current.renderAll();
      const group = customBackground2(canvasWidth, canvasHeight, scaleFactors)
      backgroundCanvasInstance.current.add(group)
      backgroundCanvasInstance.current.renderAll()
    }

    // Disable context menu on right-click
    const canvasElement = canvasRef.current
    if (canvasElement) {
      canvasElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()
      })
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener("contextmenu", (e) => {
          e.preventDefault()
        })
      }
      canvasInstance.current?.dispose()
      backgroundCanvasInstance.current?.dispose()
    }
  }, [resetState])

  useEffect(() => {
    if (backgroundCanvasInstance.current && backgroundImageURL) {
      const bgImage = new Image()
      bgImage.onload = function () {
        backgroundCanvasInstance.current?.getContext().drawImage(bgImage, 0, 0)
      }
      bgImage.src = backgroundImageURL
    }
  }, [backgroundImageURL])

  useEffect(() => {
    if (canvasInstance.current && shouldReloadCanvas) {
      canvasInstance.current.loadFromJSON(currentState, () => {
        canvasInstance.current?.renderAll()
      })
    }
  }, [shouldReloadCanvas, currentState])

  useEffect(() => {
    if (canvasInstance.current) {
      const selectedTool = new tools[drawingMode](
        canvasInstance.current
      ) as FabricTool
      const cleanupToolEvents = selectedTool.configureCanvas({
        fillColor: fillColor,
        strokeWidth: strokeWidth,
        strokeColor: strokeColor,
        displayRadius: displayRadius,
        scaleFactors: scaleFactors,
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
      })

      const handleMouseUp = () => {
        const canvasJSON = canvasInstance.current?.toJSON()
        if (canvasJSON) {
          saveState(canvasJSON)
        }
      }

      canvasInstance.current.on("mouse:up", handleMouseUp)
      canvasInstance.current.on("mouse:dblclick", handleMouseUp)

      return () => {
        cleanupToolEvents()
        canvasInstance.current?.off("mouse:up", handleMouseUp)
        canvasInstance.current?.off("mouse:dblclick", handleMouseUp)
      }
    }
  }, [
    strokeWidth,
    strokeColor,
    displayRadius,
    fillColor,
    drawingMode,
    scaleFactors,
    canvasHeight,
    canvasWidth,
    saveState,
  ])

  // Save the current drawing to localStorage whenever the canvas state changes
  useEffect(() => {
    if (canvasInstance.current) {
      const saveToLocalStorage = () => {
        const canvasData = canvasInstance.current
          ? canvasInstance.current.toJSON()
          : null
        if (canvasData) {
          localStorage.setItem(
            `canvasDrawing-${index}`,
            JSON.stringify(canvasData)
          )
          console.log(
            `Canvas data saved to localStorage for index ${index}, in DrawableCanvas.tsx using useEffect:`,
            canvasData
          )
        }
      }

      canvasInstance.current.on("object:added", saveToLocalStorage)

      return () => {
        canvasInstance.current?.off("object:added", saveToLocalStorage)
      }
    }
  }, [canvasInstance.current, index]) // Monitor the index for changes

  //// Load the drawing from localStorage when the component mounts
  useEffect(() => {
    if (canvasInstance.current) {
      const savedDrawing = localStorage.getItem(`canvasDrawing-${index}`)
      if (savedDrawing) {
        const parsedDrawing = JSON.parse(savedDrawing)
        if (canvasRef.current) {
          // Ensure the canvas is properly loaded from localStorage.
          canvasInstance.current?.loadFromJSON(parsedDrawing, () => {
            canvasInstance.current?.renderAll()
          })
          console.log(
            `Canvas data loaded from localStorage for index ${index}:`,
            savedDrawing
          )
        }
      }
    }
  }, [canvasInstance.current, index]) // Load the drawing whenever the `index` and canvasInstance.current changes

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "rgba(248, 243, 243, 0.1)", //"rgba(255, 0, 0, 0.1)",
        }}
      >
        <canvas
          id={`backgroundimage-canvas-${index}`}
          ref={backgroundCanvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          border: "1px solid black",
        }}
      >
        <canvas
          id={`canvas-${index}`}
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-lightgrey"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {displayToolbar && (
          <CanvasToolbar
            topPosition={0}
            leftPosition={canvasWidth + 5}
            downloadCallback={downloadCallback}
            downloadCallback2={downloadCallback4Json}
            //downloadCallback3={logCanvasData}
            saveCallback={() => {}} //{save2Storage}
            canUndo={canUndo}
            canRedo={canRedo}
            undoCallback={undo}
            redoCallback={redo}
            resetCallback={() => {
              //resetState(initialState);
              const userConfirmed = window.confirm(
                "Are you sure you want to clear the canvas? This action cannot be undone."
              )
              if (userConfirmed) {
                resetState(initialState)
                //console.log("Canvas has been reset.");
              } else {
                //console.log("Canvas reset canceled.");
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default DrawableCanvas
