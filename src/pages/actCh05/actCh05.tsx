import React, { useEffect, useState } from "react"
//import React from "react"
import QuestionsComponent from "../../components/QuestionsComponent"
import { quiz } from "./data" // Import the quiz data from data2.ts

const quizName = "ActCh05" // Name of the quiz

//localStorage.setItem("quizName", quizName)

const user = {
  data: {
    user: {
      id: "1345",
    },
  },
}

const Act05Comp = () => {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handlePasswordSubmit = () => {
    if (password === "pass") {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  const isAvailable = true
  const questions = quiz.questions.filter((q) => q !== undefined) // Filter out undefined elementslist
  const userId = user?.data.user.id

  if (!isAuthenticated) {
    return (
      <div className="container">
        <h1>Please enter the password to access the quiz</h1>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handlePasswordSubmit}>Submit</button>
      </div>
    )
  }

  if (!isAvailable) {
    return (
      <div className="container">
        <h1>Quiz is temporarily not available yet</h1>
      </div>
    )
  } else {
    return (
      <>
        <QuestionsComponent
          questions={questions}
          userId={userId}
          quizName={quizName}
        />
      </>
    )
  }
}

export default Act05Comp
