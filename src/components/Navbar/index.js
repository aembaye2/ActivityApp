// components/Navbar/index.js

import React from "react"
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements"

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/ActLes09">Activity-Lesson09</NavLink>
          <NavLink to="/Quiz2">Activity-Lesson10</NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
