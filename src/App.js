// App.js
import React from "react"
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./pages"
import Footer from "./components/Footer" // Import the Footer component
import Hw01Comp from "./pages/hw01/hw01"
import Act04Comp from "./pages/actCh04/actCh04"
import Act05Comp from "./pages/actCh05/actCh05"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/ActCh04" element={<Act04Comp />} />
            <Route path="/HW01" element={<Hw01Comp />} />
            <Route path="/ActCh05" element={<Act05Comp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
