// App.js
import React from "react"
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
// import ActLes09 from "./pages/quiz1/ActLes09"
// import Page3 from "./pages/quiz3/Page3"
import Pset1 from "./pages/pset1/Pset1"
import Home from "./pages"
import Footer from "./components/Footer" // Import the Footer component

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            {/* <Route path="/ActLes09" element={<ActLes09 />} />
            <Route path="/Page3" element={<Page3 />} /> */}
            <Route path="/Pset1" element={<Pset1 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
