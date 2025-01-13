// components/Navbar/index.js

import React from "react"
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements"

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/ActLes09">Activity-01</NavLink>
          {/* <NavLink to="/ActLes10">Activity-L10</NavLink>
          <NavLink to="/ActLes11">Activity-L11</NavLink>
          <NavLink to="/ExtraCreditExam2">ExtraCreditExam2</NavLink> */}
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
