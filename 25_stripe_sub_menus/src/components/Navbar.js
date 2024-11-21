import React from 'react'
import { useDataContext } from '../context/DataContext'
import {FaBars} from 'react-icons/fa6'

const createNavItems = () => {
    // create the li -> buttons
    const comps = []
    return comps
}

const Navbar = () => {

    const {navData, handleToggleSideNav} = useDataContext()

  return (
    <div className='header'>
        <div className="header__div logo">
            <img src="./images/logoipsum-286.svg" alt="logo" />
        </div>
        <nav className='header__top-nav top-nav'>
            <ul className="top-nav__ul">
                {createNavItems()}
            </ul>
        </nav>
        <nav className="header__side-nav side-nav">
            <button className="top-nav__sb-btn cursor_pointer" onClick={() => handleToggleSideNav('open')}>
                <FaBars></FaBars>
            </button>
        </nav>
    </div>
  )
}

export default Navbar