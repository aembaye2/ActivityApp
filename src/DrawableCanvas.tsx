//DrawableCanvas.tsx
import React, { useEffect, useState } from "react"
import { fabric } from "fabric"
import { isEqual } from "lodash"

import CanvasToolbar from "./components/CanvasToolbar"
import { useCanvasState } from "./DrawableCanvasState"
import { tools, FabricTool } from "./lib"

export interface ComponentArgs {
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
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [backgroundCanvas, setBackgroundCanvas] =
    useState<fabric.StaticCanvas | null>(null)
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

  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      enableRetinaScaling: false,
    })
    const imgC = new fabric.StaticCanvas("backgroundimage-canvas", {
      enableRetinaScaling: false,
    })
    setCanvas(c)
    setBackgroundCanvas(imgC)

    // Disable context menu on right-click
    const canvasElement = document.getElementById("canvas")
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
    }
  }, [])

  useEffect(() => {
    if (canvas && !isEqual(initialState, initialDrawing)) {
      canvas.loadFromJSON(initialDrawing, () => {
        canvas?.renderAll()
        resetState(initialDrawing)
      })
    }
  }, [canvas, initialDrawing, initialState, resetState])

  useEffect(() => {
    if (backgroundCanvas && backgroundImageURL) {
      const bgImage = new Image()
      bgImage.onload = function () {
        backgroundCanvas.getContext().drawImage(bgImage, 0, 0)
      }
      bgImage.src = backgroundImageURL
    }
  }, [
    backgroundCanvas,
    canvasHeight,
    canvasWidth,
    backgroundColor,
    backgroundImageURL,
    saveState,
  ])

  useEffect(() => {
    if (canvas && shouldReloadCanvas) {
      canvas.loadFromJSON(currentState, () => {
        canvas.renderAll()
      })
    }
  }, [canvas, shouldReloadCanvas, currentState])

  useEffect(() => {
    if (canvas) {
      const selectedTool = new tools[drawingMode](canvas) as FabricTool
      console.log("Selected tool:  22", selectedTool)
      const cleanupToolEvents = selectedTool.configureCanvas({
        fillColor: fillColor,
        strokeWidth: strokeWidth,
        strokeColor: strokeColor,
        displayRadius: displayRadius,
        scaleFactors: scaleFactors,
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
      })
      console.log("cleanupToolEvents: 23", cleanupToolEvents)
      const handleMouseUp = () => {
        saveState(canvas.toJSON())
      }

      canvas.on("mouse:up", handleMouseUp)
      canvas.on("mouse:dblclick", handleMouseUp)

      return () => {
        cleanupToolEvents()
        canvas.off("mouse:up", handleMouseUp)
        canvas.off("mouse:dblclick", handleMouseUp)
      }
    }
  }, [
    canvas,
    strokeWidth,
    strokeColor,
    displayRadius,
    fillColor,
    drawingMode,
    initialDrawing,
    scaleFactors,
    canvasHeight,
    canvasWidth,
    saveState,
  ])

  const downloadCallback = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
      })
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "canvas.png"
      link.click()
    }
  }

  //const downloadCallback = () => {} //if you want to download button or to do nothing

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <canvas
          id="backgroundimage-canvas"
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
          backgroundColor: "rgba(255, 0, 0, 0.1)", // Add this line
        }}
      >
        <canvas
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
          style={{ border: "lightgrey 1px solid" }}
        />
        {displayToolbar && (
          <CanvasToolbar
            topPosition={0}
            leftPosition={canvasWidth}
            downloadCallback={downloadCallback}
            canUndo={canUndo}
            canRedo={canRedo}
            undoCallback={undo}
            redoCallback={redo}
            resetCallback={() => {
              resetState(initialState)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default DrawableCanvas
