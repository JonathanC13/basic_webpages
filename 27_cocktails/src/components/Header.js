import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className="header__div head">
        <h1 className='head__h1'>Cocktails!</h1>
        <nav className="head__nav">
            <NavLink className='nav__Home' to="/" end>
                Home
            </NavLink>
            <NavLink className='nav__About' to="/about" end>
                About
            </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header