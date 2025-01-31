import React, { useState, useEffect } from "react"
import DrawingApp from "./canvas/DrawingApp"
//import { handleJsonSave, handleGeneratePDF } from "./utils";
import { handleGeneratePDF } from "./utils"
//import { fabric } from "fabric";
//import { useCanvasStore } from "./canvas/useCanvasStore"

interface QuizProps {
  questions: {
    qtype: string
    question: string
    options?: string[] //answers: string[];
    Ref: string | string[]
  }[]
  userId: string | undefined
  quizName: string
}

const QuestionsComponent = ({ questions, userId, quizName }: QuizProps) => {
  const [storageSize, setStorageSize] = useState<number | null>(null)
  // Function to calculate the size of data stored in localStorage
  const getLocalStorageSize = () => {
    let totalSize = 0
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const item = localStorage.getItem(key)
        if (item) {
          totalSize += (item.length + key.length) * 2 // Size in bytes
        }
      }
    }
    setStorageSize(totalSize) // Update state with the calculated size
  }
  //const [userAnswers, setUserAnswers] = useState<{    [key: number]: string | number;   }>({});
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | number
  }>({})
  useEffect(() => {
    const storedAnswers = localStorage.getItem("userAnswers")
    if (storedAnswers) {
      setUserAnswers(JSON.parse(storedAnswers))
    }
  }, [])
  console.log("userAnswers", userAnswers)
  const [fullname, setFullname] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  console.log("currentQuestionIndex", currentQuestionIndex)
  const [showResults, setShowResults] = useState(false)

  //const currentState = useCanvasStore((state: any) => state.currentState) // get it from store

  const saveCanvasImage2storage = async (index: number) => {
    const mainCanvasId = `canvas-${index}`
    const backgroundCanvasId = `backgroundimage-canvas-${index}`

    const mainCanvas = document.getElementById(
      mainCanvasId
    ) as HTMLCanvasElement
    const backgroundCanvas = document.getElementById(
      backgroundCanvasId
    ) as HTMLCanvasElement

    if (!mainCanvas || !backgroundCanvas) {
      //if (!mainCanvas) {
      console.error("Canvas elements not found")
      return null
    }

    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = mainCanvas.width
    tempCanvas.height = mainCanvas.height
    const tempCtx = tempCanvas.getContext("2d")

    if (!tempCtx) {
      console.error("Failed to get 2D context")
      return null
    }

    tempCtx.drawImage(
      backgroundCanvas,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    )
    tempCtx.drawImage(mainCanvas, 0, 0, tempCanvas.width, tempCanvas.height)

    const dataURL = tempCanvas.toDataURL("image/png")
    localStorage.setItem(`canvasImage-${index}`, dataURL)
  }

  const handleInputChange = (questionId: any, value: any) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value, // Store the answer for the specific questionId
    }))
  }

  const handleNext = async () => {
    //console.log("currentState of canvas located in Qcomp.tsx : ", currentState) // this a state define here but fetched from store
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers))

    if (questions[currentQuestionIndex].qtype === "graphing-quest") {
      await saveCanvasImage2storage(currentQuestionIndex) //calling the function here
    }

    //if (showResults) return; // Prevent further updates after showing results ()
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      alert(
        "Please don't forget to download the PDF and submit it to gradescope. Finishing the assessment may save your work temporarly to your browser but it is not submitted to server where the instructor has access."
      )
      setShowResults(true)

      // const apiRoute = quizName ? `/api/${quizName}Results` : null

      // if (!apiRoute) {
      //   throw new Error("Quiz name is required to determine the API route.")
      // }

      // fetch(apiRoute, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     userId: userId,
      //     userAnswers: userAnswers,
      //     quizName: quizName,
      //   }),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not working.")
      //     }
      //     return response.json()
      //   })
      //   .then((data) => {
      //     console.log("Quiz results saved successfully:", data)
      //   })
      //   .catch((error) => {
      //     console.error("Error saving quiz results:", error)
      //   })
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const startquiz = () => {
    setCurrentQuestionIndex(1)
  }

  return (
    <div className="min-h-[100px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        <form
        // onSubmit={(e) => handleJsonSave(e, questions, userAnswers)}
        // style={{ flex: "1" }}
        >
          {/* Render the question section or results based on `showResults` */}
          {!showResults ? (
            <>
              <div style={{ marginBottom: "30px" }}>
                <label>
                  Full Name:
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    style={{
                      marginLeft: "10px",
                      width: "400px",
                      height: "40px",
                    }}
                  />
                </label>
              </div>
              <div
                style={{
                  textAlign: "right",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  Question: {currentQuestionIndex + 1}
                  <span>/{questions.length}</span>
                </h3>
                <button
                  type="button"
                  onClick={(e) =>
                    handleGeneratePDF(
                      e,
                      questions,
                      userAnswers,
                      fullname,
                      quizName
                    )
                  }
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Download PDF File"
                    : "Download PDF File"}
                </button>
              </div>
              {/* Local starage  */}
              {/* <div>
                <button onClick={getLocalStorageSize}>
                  Check LocalStorage Size
                </button>
                {storageSize !== null && (
                  <p>Total localStorage size: {storageSize} bytes</p>
                )}
              </div> */}
              {/* Displaying only the current question */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  {questions &&
                    questions.length > 0 &&
                    currentQuestionIndex >= 0 &&
                    questions[currentQuestionIndex].Ref.length > 0 && (
                      <>
                        {questions[currentQuestionIndex].Ref[0] === "img" && (
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/" +
                              questions[currentQuestionIndex].Ref[1]
                            }
                            alt="Question Reference"
                            style={{ maxWidth: "50%", marginTop: "10px" }}
                          />
                        )}
                        {questions[currentQuestionIndex].Ref[0] ===
                          "url_link" && (
                          <>
                            <div>
                              {questions[currentQuestionIndex].Ref[2] && (
                                <span>
                                  {questions[currentQuestionIndex].Ref[2]}&nbsp;
                                </span>
                              )}
                              <a
                                href={questions[currentQuestionIndex].Ref[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {questions[currentQuestionIndex].Ref[1]}
                              </a>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  <br />
                  {currentQuestionIndex < questions.length && (
                    <label>
                      {currentQuestionIndex + 1}.{" "}
                      {questions[currentQuestionIndex].question}
                    </label>
                  )}
                </div>

                {/* Render question types based on the `qtype` */}
                {questions[currentQuestionIndex].qtype === "mc-quest" && (
                  <div>
                    {questions[currentQuestionIndex].options?.map(
                      (option, i) => (
                        <div key={i}>
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            value={option}
                            checked={
                              userAnswers[currentQuestionIndex] === option
                            }
                            onChange={() =>
                              handleInputChange(currentQuestionIndex, option)
                            }
                          />
                          {option}
                        </div>
                      )
                    )}
                  </div>
                )}
                {questions[currentQuestionIndex].qtype ===
                  "float-num-quest" && (
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="number"
                      value={userAnswers[currentQuestionIndex] || ""}
                      style={{ height: "35px", fontSize: "16px" }}
                      onChange={(e) =>
                        handleInputChange(currentQuestionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {questions[currentQuestionIndex].qtype ===
                  "one-line-text-quest" && (
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      value={userAnswers[currentQuestionIndex] || ""}
                      maxLength={150}
                      style={{
                        width: "90%",
                        height: "35px",
                        fontSize: "20px",
                      }}
                      onChange={(e) =>
                        handleInputChange(currentQuestionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {questions[currentQuestionIndex].qtype ===
                  "manylines-text-quest" && (
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      value={userAnswers[currentQuestionIndex] || ""}
                      maxLength={1000}
                      style={{
                        width: "96%",
                        height: "100px",
                        fontSize: "20px",
                      }}
                      onChange={(e) =>
                        handleInputChange(currentQuestionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {questions[currentQuestionIndex].qtype === "graphing-quest" && (
                  <div
                    style={{
                      marginTop: "50px",
                      marginLeft: "50px",
                      marginBottom: "500px",
                    }}
                  >
                    <DrawingApp index={currentQuestionIndex} />
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              {/* <div>
                <h1>Current Canvas State:</h1>
                <pre>{JSON.stringify(currentState, null, 2)}</pre>
                <button onClick={handleJsonClick}>Save Current State</button>
              </div> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                >
                  {currentQuestionIndex === 0 ? "" : "← Previous Question"}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ marginRight: "200px" }} // Add margin to the left of the Next button
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish Assessment"
                    : "Next Question →"}
                </button>

                {/* <div style={{ textAlign: "right", padding: "20px" }}>
                  <button
                    type="button"
                    //disabled={currentQuestionIndex != questions.length - 1}
                    onClick={(e) =>
                      handleGeneratePDF(e, questions, userAnswers, fullname)
                    }
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Download PDF File"
                      : "Download PDF File"}
                  </button>
                </div> */}
              </div>
            </>
          ) : (
            <div className="text-center">
              {/* Results section */}
              <div style={{ marginTop: "20px" }}>
                <h3> You have successfully completed {quizName} ...! 📈</h3>

                {/* <button
                  type="submit"
                  className="p-1 rounded-md bg-primary text-white text-center text-1xl"
                >
                  Download Json File
                </button> */}
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={() => window.location.reload()}
                  // className="p-1 rounded-md bg-dark text-white text-center text-1xl mt-10"
                >
                  Restart Assessement →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default QuestionsComponent
