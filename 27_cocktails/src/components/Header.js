import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <h1 className='header__h1'>Cocktails!</h1>
        <nav className="header__nav">
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/about" end>
                About
            </NavLink>
        </nav>
    </header>
  )
}

export default Header