import React from 'react'
import { NavLink } from 'react-router-dom'

// import css
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='logo'>Logo</div>

            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar