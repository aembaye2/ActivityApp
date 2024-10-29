import React from "react"
import QuestionsComponent from "../components/QuestionsComponent"
import data from "./questions1.json" // Import the JSON file

const ActLes09 = () => {
  return (
    <div>
      <h1>Activity on Lesson 9</h1>
      <QuestionsComponent questions={data.questions} />
    </div>
  )
}

export default ActLes09
