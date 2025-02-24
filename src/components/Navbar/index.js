// components/Navbar/index.js

import React from "react"
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements"

const Navbar = () => {
  const currentDate = new Date()
  const hw02DueDate = new Date("2025-02-24T09:00:00") // Set the due date for Homework 2 with hours and minutes

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/Home">Home</NavLink>
          {/* <NavLink to="/ActCh00">Ch00</NavLink> */}
          {/* <NavLink to="/ActCh04">Ch4 Activity</NavLink>
          // <NavLink to="/ActCh05">Ch5 Activity</NavLink>*/}

          {currentDate <= hw02DueDate && (
            <NavLink to="/ActCh06">Ch6 Activity</NavLink>
          )}
          {/* <NavLink to="/Hw01">Homework 1</NavLink> */}
          {currentDate <= hw02DueDate && (
            <NavLink to="/Hw02">Homework 2</NavLink>
          )}
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
