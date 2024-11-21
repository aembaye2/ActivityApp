import React, { useState } from "react"
import { saveAs } from "file-saver"
//import html2canvas from "html2canvas"
import { PDFDocument, StandardFonts } from "pdf-lib"
import DrawingApp from "./DrawingApp"

const QuestionsComponent = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState({})
  const [fullname, setFullname] = useState("")

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

  // const generateCanvasImage = async (id) => {
  //   const canvas = document.getElementById(id)
  //   if (canvas) {
  //     const canvasElement = await html2canvas(canvas)
  //     return canvasElement.toDataURL("image/png")
  //   }
  //   return ""
  // }

  const wrapText = (text, font, size, maxWidth) => {
    const words = text.split(" ")
    let lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = font.widthOfTextAtSize(currentLine + " " + word, size)
      if (width < maxWidth) {
        currentLine += " " + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  const addNewPage = (pdfDoc, pageWidth, pageHeight) => {
    const page = pdfDoc.addPage([pageWidth, pageHeight])
    return { page, yOffset: pageHeight - 50 }
  }

  const handleGeneratePDF = async (e) => {
    e.preventDefault()

    const userInputData = questions.map((question, index) => ({
      ...question,
      "user-answer": userAnswers[index] || "",
    }))

    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const paddingLeft = 20
    const pageHeight = 800
    const pageWidth = 600
    const maxWidth = pageWidth - 2 * paddingLeft

    let { page, yOffset } = addNewPage(pdfDoc, pageWidth, pageHeight)

    const fullNameLines = wrapText(
      `Full Name: ${fullname}`,
      boldFont,
      14,
      maxWidth
    )
    for (const line of fullNameLines) {
      page.drawText(line, {
        x: paddingLeft,
        y: yOffset,
        size: 14,
        font: boldFont,
      })
      yOffset -= 20
    }
    yOffset -= 20

    for (const [index, question] of userInputData.entries()) {
      if (yOffset < 100) {
        ;({ page, yOffset } = addNewPage(pdfDoc, pageWidth, pageHeight))
      }

      const questionText = `${index + 1}. ${question.label}`
      const questionLines = wrapText(questionText, font, 12, maxWidth)
      for (const line of questionLines) {
        page.drawText(line, {
          x: paddingLeft,
          y: yOffset,
          size: 12,
          font: font,
        })
        yOffset -= 20
      }

      if (question.qtype === "mc-quest") {
        for (const option of question.options) {
          if (yOffset < 100) {
            ;({ page, yOffset } = addNewPage(pdfDoc, pageWidth, pageHeight))
          }

          const optionLines = wrapText(option, font, 10, maxWidth - 20)
          for (const line of optionLines) {
            page.drawText(line, {
              x: paddingLeft + 20,
              y: yOffset,
              size: 10,
              font: font,
            })
            yOffset -= 15
          }
        }
      }

      if (yOffset < 100) {
        ;({ page, yOffset } = addNewPage(pdfDoc, pageWidth, pageHeight))
      }

      const answerText = `Answer: ${question["user-answer"]}`
      const answerLines = wrapText(answerText, boldFont, 12, maxWidth)
      for (const line of answerLines) {
        page.drawText(line, {
          x: paddingLeft,
          y: yOffset,
          size: 12,
          font: boldFont,
        })
        yOffset -= 20
      }
      yOffset -= 10

      if (question.qtype === "graphing-quest") {
        const mainCanvasId = `canvas-canvas-${index}`
        const backgroundCanvasId = `backgroundimage-canvas-canvas-${index}`

        // Function to combine main and background canvases
        async function combineCanvases(mainCanvasId, backgroundCanvasId) {
          const mainCanvas = document.getElementById(mainCanvasId)
          const backgroundCanvas = document.getElementById(backgroundCanvasId)

          // Create a temporary canvas with the same dimensions
          const tempCanvas = document.createElement("canvas")
          tempCanvas.width = mainCanvas.width
          tempCanvas.height = mainCanvas.height
          const tempCtx = tempCanvas.getContext("2d")

          // Draw the background canvas first
          tempCtx.drawImage(
            backgroundCanvas,
            0,
            0,
            tempCanvas.width,
            tempCanvas.height
          )

          // Draw the main canvas on top
          tempCtx.drawImage(
            mainCanvas,
            0,
            0,
            tempCanvas.width,
            tempCanvas.height
          )

          // Return the combined image as a data URL
          return tempCanvas.toDataURL("image/png")
        }

        // Generate the combined image
        const combinedCanvasImage = await combineCanvases(
          mainCanvasId,
          backgroundCanvasId
        )

        if (combinedCanvasImage) {
          if (yOffset < 250) {
            ;({ page, yOffset } = addNewPage(pdfDoc, pageWidth, pageHeight))
          }

          // Embed the combined image in the PDF
          const pngImage = await pdfDoc.embedPng(combinedCanvasImage)
          page.drawImage(pngImage, {
            x: paddingLeft,
            y: yOffset - 200,
            width: 200,
            height: 200,
          })
          yOffset -= 250
        }
      }
    }

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: "application/pdf" })
    saveAs(blob, "user-input.pdf")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingLeft: "20px",
      }}
    >
      <div style={{ textAlign: "right", padding: "20px" }}>
        <button type="button" onClick={handleGeneratePDF}>
          Generate PDF
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ flex: "1" }}>
        <div style={{ marginBottom: "30px" }}>
          <label>
            Full Name:
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              style={{ marginLeft: "10px", width: "400px", height: "40px" }}
            />
          </label>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "300px", paddingRight: "20px" }}>
            {questions
              .slice(0, Math.ceil(questions.length / 2))
              .map((question, index) => (
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
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="number"
                        style={{ height: "35px", fontSize: "16px" }} // Adjust the width as needed
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </div>
                  )}
                  {question.qtype === "one-line-text-quest" && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        maxLength={150}
                        style={{
                          width: "90%",
                          height: "35px",
                          fontSize: "20px",
                        }} // Adjust the width as needed
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </div>
                  )}
                  {question.qtype === "manylines-text-quest" && (
                    <div style={{ marginTop: "10px" }}>
                      <textarea
                        maxLength={500}
                        style={{
                          width: "96%",
                          height: "100px",
                          fontSize: "20px",
                        }} // Adjust the width as needed
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </div>
                  )}
                  {question.qtype === "graphing-quest" && (
                    <div
                      style={{
                        marginTop: "50px",
                        marginLeft: "50px",
                        marginBottom: "500px",
                      }}
                    >
                      <DrawingApp id={`canvas-${index}`} />
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div
            style={{ width: "1px", backgroundColor: "#000", margin: "0 20px" }}
          ></div>
          <div style={{ flex: "1", minWidth: "300px", paddingLeft: "20px" }}>
            {questions
              .slice(Math.ceil(questions.length / 2))
              .map((question, index) => (
                <div
                  key={index + Math.ceil(questions.length / 2)}
                  style={{ marginBottom: "30px" }}
                >
                  <label>
                    {index + 1 + Math.ceil(questions.length / 2)}.{" "}
                    {question.label}
                  </label>
                  {question.qtype === "mc-quest" && (
                    <div>
                      {question.options.map((option, i) => (
                        <div key={i}>
                          <input
                            type="radio"
                            name={`question-${
                              index + Math.ceil(questions.length / 2)
                            }`}
                            value={option}
                            onChange={() =>
                              handleInputChange(
                                index + Math.ceil(questions.length / 2),
                                option
                              )
                            }
                          />
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                  {question.qtype === "float-num-quest" && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleInputChange(
                            index + Math.ceil(questions.length / 2),
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {question.qtype === "one-line-text-quest" && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        maxLength={150}
                        style={{
                          width: "95%",
                          height: "35px",
                          fontSize: "20px",
                        }}
                        onChange={(e) =>
                          handleInputChange(
                            index + Math.ceil(questions.length / 2),
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {question.qtype === "manylines-text-quest" && (
                    <div style={{ marginTop: "10px" }}>
                      <textarea
                        maxLength={500}
                        style={{
                          width: "100%",
                          height: "100px",
                          fontSize: "20px",
                        }}
                        onChange={(e) =>
                          handleInputChange(
                            index + Math.ceil(questions.length / 2),
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {question.qtype === "graphing-quest" && (
                    <div
                      style={{
                        marginTop: "50px",
                        marginLeft: "50px",
                        marginBottom: "500px",
                      }}
                    >
                      <DrawingApp
                        id={`canvas-${index + Math.ceil(questions.length / 2)}`}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default QuestionsComponent