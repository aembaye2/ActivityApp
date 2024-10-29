//DrawingComp.tsx

import React, { useState, useEffect } from "react"
import DrawableCanvas, { ComponentArgs } from "./DrawableCanvas"
import DrawingModeSelector from "./DrawingModeSelector"
import { CanvasStateProvider } from "./DrawableCanvasState"

//import "./index.css"

function DrawingComp() {
  const [drawingMode, setDrawingMode] = useState("point")
  const [initialDrawing, setInitialDrawing] = useState({})

  useEffect(() => {
    fetch("initial_drawing.json")
      .then((response) => response.json())
      .then((data) => {
        // Set all objects to not selectable
        if (data.objects) {
          data.objects.forEach((obj: any) => {
            obj.selectable = false
          })
        }
        setInitialDrawing(data)
      })
      .catch((error) => console.error("Error fetching initial drawing:", error))
  }, [])

  const canvasWidth = 500
  const canvasHeight = 400
  const xlim = 100 // absolute in pixels
  const ylim = 100 // absolute in pixels
  const bottom_margin = 55 //75 // absolute in pixels
  const left_margin = 50 //84
  const top_margin = 25
  const right_margin = 35
  const scaleFactors = [
    xlim,
    ylim,
    bottom_margin,
    left_margin,
    top_margin,
    right_margin,
  ]

  const canvasProps: ComponentArgs = {
    fillColor: "transparent",
    strokeWidth: 3,
    strokeColor: "black",
    backgroundColor: "#ffffff",
    backgroundImageURL: "",
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    drawingMode: drawingMode,
    initialDrawing: initialDrawing,
    displayToolbar: true,
    displayRadius: 5,
    scaleFactors: scaleFactors,
  }

  return (
    <div>
      <DrawingModeSelector
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
      />
      <CanvasStateProvider>
        <DrawableCanvas {...canvasProps} />
      </CanvasStateProvider>
    </div>
  )
}

export default DrawingComp
