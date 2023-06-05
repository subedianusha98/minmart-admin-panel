import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// import css

const Navbar = () => {
    return (
        <nav className='h-[--nav-height] flex items-center px-[2rem]'>
            <div className='mr-auto'>
                <Link to="/" className='text-[1.5rem]'>Logo</Link>
            </div>

            <ul className='flex'>
                <li>
                    <NavLink to='/login' className="text-[1.5rem]">Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar