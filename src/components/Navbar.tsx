// import React from 'react'
import { NavLink } from 'react-router'
import '../App.css'
import GalaxyIcon from '../../public/galaxy.png'

function Navbar() {
    return (
        <nav className='navbar'>
            <ul>
                <NavLink to='/'>
                    <img width='60px' src={GalaxyIcon} alt="logo" />
                </NavLink>
            </ul>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    Home
                </NavLink></li>
                <li><NavLink to="/ShowCreators" className={({ isActive }) => isActive ? "active" : ""}>
                    Show Creators
                </NavLink></li>
                <li><NavLink to="/AddCreator" className={({ isActive }) => isActive ? "active" : ""}>
                    Add Creator
                </NavLink></li>
            </ul>
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
