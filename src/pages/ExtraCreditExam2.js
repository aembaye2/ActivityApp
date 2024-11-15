import React from "react"
import QuestionsComponent from "../components/QuestionsComponent"
import data from "./ExtraCreditExam2.json" // Import the JSON file

const ExtraCreditExam2 = () => {
  const currentDate = new Date()
  const targetDate = new Date("2024-11-15T11:30:00")
  const endDate = new Date("2024-11-19T23:59:00")

  const isAvailable = currentDate >= targetDate && currentDate <= endDate

  return (
    <div>
      <h1>Extra-credit-work: AD-AS model application</h1>
      <p>
        Note that you are here just generating a .pdf format of your answers to
        the questions. Nothing is submitted here. Once you generate the pdf file
        submit it on gradescope. Directions on how to do so are given in
        blackboard of the course.
      </p>
      {isAvailable ? (
        <QuestionsComponent questions={data.questions} />
      ) : (
        <p>Not available yet or past due</p>
      )}
    </div>
  )
}

export default ExtraCreditExam2
