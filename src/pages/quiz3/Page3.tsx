import React from "react"
//import QuizManual from "@/components/Quiz";
import QuestionsComponent from "../../components/QuestionsComponent"
//import { quiz } from "./data"; // Import the quiz data from data.ts
import { quiz } from "./data" // Import the quiz data from data2.ts

const quizName = "quiz3"

const user = {
  data: {
    user: {
      id: "1345",
    },
  },
}

const Page3 = () => {
  // const currentDate = new Date()
  // const targetDate = new Date("2024-11-11T09:00:00")
  // const endDate = new Date("2024-12-31T12:15:00")
  // const isAvailable = currentDate >= targetDate && currentDate <= endDate

  const questions = quiz.questions // Get questions from the imported quiz data, is a list
  const userId = user?.data.user.id
  const isAvailable = true
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

export default Page3
