import React, { useEffect } from "react"
//import React from "react"
import QuestionsComponent from "../../components/QuestionsComponent"
import { quiz } from "./data" // Import the quiz data from data2.ts

const quizName = "ActCh04" // Name of the quiz

//localStorage.setItem("quizName", quizName)

const user = {
  data: {
    user: {
      id: "1345",
    },
  },
}

const Act04Comp = () => {
  // useEffect(() => {
  //   localStorage.setItem("quizName", quizName)
  // }, []) // Empty dependency array ensures this runs only once when the component mounts

  // const currentDate = new Date()
  // const targetDate = new Date("2025-01-30T09:00:00")
  // const endDate = new Date("2025-01-04T23:59:00")
  // const isAvailable = currentDate >= targetDate && currentDate <= endDate
  const isAvailable = true
  //const questions = quiz.questions // Get questions from the imported quiz data, is a
  const questions = quiz.questions.filter((q) => q !== undefined) // Filter out undefined elementslist
  const userId = user?.data.user.id

  if (!isAvailable) {
    return (
      <div className="container">
        <h1>Quiz is temporarely not available yet</h1>
      </div>
    )
  } else {
    return (
      <>
        {/* <Quiz questions={questions} userId={userId} quizName={quizName} /> */}
        <QuestionsComponent
          questions={questions}
          userId={userId}
          quizName={quizName}
        />
      </>
    )
  }
}

export default Act04Comp
