import React from 'react'
import { useDataContext } from '../context/DataContext'
import {FaBars} from 'react-icons/fa6'
import TopNavItems from './TopNavItems'
import {useEffect, useCallback} from 'react'
import Signin from './Signin'

const createNavItems = (navData) => {
    // create the li -> buttons
    const comps = navData.map((item, idx) => {
        return (
            <TopNavItems
                key={idx}
                item={item}
            />
        )
    })
    return comps
}

const Navbar = () => {

    const {navData, handleToggleSubmenu, handleToggleSideNav} = useDataContext()

    const handleSubmenu = useCallback((e) => {
        if (!e.target.classList.contains('TopNavItem__btn')) {
            handleToggleSubmenu('close');
        }
    }, [handleToggleSubmenu]);

    // ensures the subcontainer is closed if none of the TopNavItems components are hovered/focused
    useEffect(() => {
        const header = document.getElementById('header-nav')
        header.addEventListener("mouseover", handleSubmenu)
        header.addEventListener("focusin", handleSubmenu)

        const cleanUp = () => {
            //console.log("runs if a useEffect dep changes.")
            header.removeEventListener("mouseover", handleSubmenu)  // remove this specific listener
            header.removeEventListener("focusin", handleSubmenu)  // remove this specific listener
        }

        return cleanUp; // exec the cleanUp func when the component is removed from the DOM
    }, [handleSubmenu])

  return (
    <div id='header-nav' className='header'>
        <div className="header__div head-logo">
            <a className='head-logo__a logo cursor_pointer' href="/home">
                <img src="./images/logoipsum-289.svg" alt="logo" />
            </a>
        </div>
        <nav className='header__top-nav top-nav'>
            <ul className="top-nav__ul">
                {createNavItems(navData)}
            </ul>
        </nav>
        <nav className="header__side-nav side-nav">
            <button className="top-nav__sb-btn cursor_pointer" onClick={() => handleToggleSideNav('open')}>
                <FaBars></FaBars>
            </button>
        </nav>
        <div className="header__signin">
            <Signin/>
        </div>
    </div>
  )
}

export default Navbar