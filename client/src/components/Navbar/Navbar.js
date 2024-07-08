import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className='header'>
            <nav className='navbar'>
                <NavLink to='/'>Page 1</NavLink>
                <NavLink to='/page2'>Page 2</NavLink>
            </nav>
        </header>
    )
}

export default Navbar