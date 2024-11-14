// App.js
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import ActLes09 from "./pages/ActLes09"
import ActLes10 from "./pages/ActLes10"
import ActLes11 from "./pages/ActLes11"
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
            <Route path="/ActLes10" element={<ActLes10 />} />
            <Route path="/ActLes11" element={<ActLes11 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
