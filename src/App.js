// App.js
import React from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ActLes09 from "./pages/ActLes09"
import Quiz2 from "./pages/Quiz2"
import Home from "./pages"
// import About from "./pages/about";
// import Events from "./pages/events";
// import AnnualReport from "./pages/annual";
// import Blogs from "./pages/blogs";
// import SignUp from "./pages/signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/annual" element={<AnnualReport />} /> */}
        <Route path="/ActLes09" element={<ActLes09 />} />
        <Route path="/Quiz2" element={<Quiz2 />} />
        {/* <Route path="/blogs" element={<Blogs />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
      </Routes>
    </Router>
  )
}

export default App
