// App.js
import React from "react"
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./pages"
import Footer from "./components/Footer" // Import the Footer component
import Act00Comp from "./pages/actCh00/actCh00"
import Hw01Comp from "./pages/hw01/hw01"
import Hw02Comp from "./pages/hw02/hw02"
import Act04Comp from "./pages/actCh04/actCh04"
import Act05Comp from "./pages/actCh05/actCh05"
import Act06Comp from "./pages/actCh06/actCh06"
import ActCh07Comp from "./pages/actCh07/actCh07"
import ActCh08Comp from "./pages/actCh08/actCh08"
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/ActCh00" element={<Act00Comp />} />
            <Route path="/ActCh04" element={<Act04Comp />} />
            <Route path="/HW01" element={<Hw01Comp />} />
            <Route path="/HW02" element={<Hw02Comp />} />
            <Route path="/ActCh05" element={<Act05Comp />} />
            <Route path="/ActCh06" element={<Act06Comp />} />
            <Route path="/ActCh07" element={<ActCh07Comp />} />
            <Route path="/ActCh08" element={<ActCh08Comp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
