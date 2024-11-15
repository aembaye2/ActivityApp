import React from "react"
import QuestionsComponent from "../components/QuestionsComponent"
import data from "./questions3.json" // Import the JSON file

const ActLes11 = () => {
  const currentDate = new Date()
  const targetDate = new Date("2024-11-14T11:30:00")
  const endDate = new Date("2024-11-14T12:15:00")
  // const targetDate = new Date("2024-11-15T11:30:00")
  // const endDate = new Date("2024-11-19T23:59:00")

  const isAvailable = currentDate >= targetDate && currentDate <= endDate

  return (
    <div>
      <h1>Activity on Monetary Policy</h1>
      {isAvailable ? (
        <QuestionsComponent questions={data.questions} />
      ) : (
        <p>Not available yet or past due</p>
      )}
    </div>
  )
}

export default ActLes11
