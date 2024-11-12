import React from "react"
import QuestionsComponent from "../components/QuestionsComponent"
import data from "./questions2.json" // Import the JSON file

const ActLes10 = () => {
  const currentDate = new Date()
  const targetDate = new Date("2024-11-12T11:30:00")
  const endDate = new Date("2024-11-12T12:15:00")

  const isAvailable = currentDate >= targetDate && currentDate <= endDate

  return (
    <div>
      <h1>Activity on Lesson 10</h1>
      {isAvailable ? (
        <QuestionsComponent questions={data.questions} />
      ) : (
        <p>Not available yet or past due</p>
      )}
    </div>
  )
}

export default ActLes10
