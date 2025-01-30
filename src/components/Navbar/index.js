// components/Navbar/index.js

import React from "react"
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements"

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/Home">Home</NavLink>
          <NavLink to="/Pset1">Ch4 Activity</NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
