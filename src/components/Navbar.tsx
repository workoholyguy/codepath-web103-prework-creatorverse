// import React from 'react'
import { NavLink } from 'react-router'
import '../App.css'



function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                Home
            </NavLink>
            <NavLink to="/ShowCreators" className={({ isActive }) => isActive ? "active" : ""}>
                ShowCreators
            </NavLink>
            <NavLink to="/AddCreator" className={({ isActive }) => isActive ? "active" : ""}>
                AddCreator
            </NavLink>
            {/* <NavLink to="/EditCreator" className={({ isActive }) => isActive ? "active" : ""}>
                    EditCreator
                </NavLink>
                <NavLink to="/ViewCreator" className={({ isActive }) => isActive ? "active" : ""}>
                    ViewCreator
                </NavLink> */}
        </nav>
    )
}

export default Navbar
