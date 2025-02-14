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
          {/* <NavLink to="/ActCh00">Ch00</NavLink> */}
          {/* <NavLink to="/ActCh04">Ch4 Activity</NavLink>
          // <NavLink to="/ActCh05">Ch5 Activity</NavLink>*/}
          {/* <NavLink to="/ActCh06">Ch6 Activity</NavLink> */}
          {/* <NavLink to="/Hw01">Homework 1</NavLink> */}
          <NavLink to="/Hw02">Homework 2</NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
