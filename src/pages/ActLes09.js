import React from "react"
import QuestionsComponent from "../components/QuestionsComponent"
import data from "./questions1.json" // Import the JSON file

const ActLes09 = () => {
  const currentDate = new Date()
  const targetDate = new Date("2024-11-11T09:00:00")
  const endDate = new Date("2024-11-11T12:15:00")

  const isAvailable = currentDate >= targetDate && currentDate <= endDate

  return (
    <div>
      <h1>Activity on Lesson 9</h1>
      {isAvailable ? (
        <QuestionsComponent questions={data.questions} />
      ) : (
        <p>Past due</p>
      )}
    </div>
  )
}

export default ActLes09
