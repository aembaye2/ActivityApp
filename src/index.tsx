//index.tsx
import React from "react"
import ReactDOM from "react-dom"
//import ReactDOM from "react-dom/client";
import App from "./App"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <h1> React Typescript Drawing App</h1>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
