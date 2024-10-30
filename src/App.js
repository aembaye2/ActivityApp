// App.js
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import ActLes09 from "./pages/ActLes09"
import Quiz2 from "./pages/Quiz2"
import Home from "./pages"
import Footer from "./components/Footer" // Import the Footer component

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ActLes09" element={<ActLes09 />} />
            <Route path="/Quiz2" element={<Quiz2 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
