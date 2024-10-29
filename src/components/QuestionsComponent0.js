import React, { useState } from "react"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"
import DrawingComp from "./DrawingComp"

const QuestionsComponent = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState({})

  const handleInputChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userInputData = questions.map((question, index) => ({
      ...question,
      "user-answer": userAnswers[index] || "",
    }))

    const json = JSON.stringify(userInputData, null, 2)
    const blob = new Blob([json], { type: "application/json" })

    saveAs(blob, "user-input.json")
  }

  const generateCanvasImage = async () => {
    const canvas = document.getElementById("canvas")
    if (canvas) {
      const canvasElement = await html2canvas(canvas)
      return canvasElement.toDataURL("image/png")
    }
    return ""
  }

  const handleGenerateHTML = async (e) => {
    e.preventDefault()

    const userInputData = questions.map((question, index) => ({
      ...question,
      "user-answer": userAnswers[index] || "",
    }))

    const canvasImage = await generateCanvasImage()

    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Input</title>
    <style>
      .answer-box {
        overflow: auto; 
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 20px;
      }
      .small-answer-box { height: 50px; }
      .large-answer-box { height: 100px; }
      .graphing-canvas { width: 50%; height: auto; } /* Adjust the width to make the image smaller */
    </style>
  </head>
  <body>
    ${userInputData
      .map(
        (question, index) => `
      <div>
        <h3>${index + 1}. ${question.label}</h3>
        ${
          question.qtype === "mc-quest"
            ? `<ul>${question.options
                .map((option) => `<li>${option}</li>`)
                .join("")}</ul>`
            : ""
        }
        <div class="answer-box ${
          question.qtype === "manylines-text-quest"
            ? "large-answer-box"
            : "small-answer-box"
        }">
          <p>Answer: ${question["user-answer"]}</p>
        </div>
        ${
          question.qtype === "graphing-quest" && canvasImage
            ? `<div><h3>Graphing Canvas</h3><img src="${canvasImage}" alt="Graphing Canvas" class="graphing-canvas"/></div>`
            : ""
        }
      </div>
    `
      )
      .join("")}
  </body>
  </html>
`

    const blob = new Blob([htmlContent], { type: "text/html" })
    saveAs(blob, "user-input.html")
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ textAlign: "right", padding: "20px" }}>
        {/* <button type="submit">Generate json file</button> */}
        <button type="button" onClick={handleGenerateHTML}>
          Generate HTML
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ flex: "1" }}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <label>
              {index + 1}. {question.label}
            </label>
            {question.qtype === "mc-quest" && (
              <div>
                {question.options.map((option, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleInputChange(index, option)}
                    />
                    {option}
                  </div>
                ))}
              </div>
            )}
            {question.qtype === "float-num-quest" && (
              <input
                type="number"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
            {question.qtype === "one-line-text-quest" && (
              <input
                type="text"
                maxLength={60}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
            {question.qtype === "manylines-text-quest" && (
              <textarea
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
            {question.qtype === "graphing-quest" && (
              <div
                style={{
                  marginTop: "50px",
                  marginLeft: "600px",
                  marginBottom: "50px",
                }}
              >
                <DrawingComp />
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  )
}

export default QuestionsComponent
