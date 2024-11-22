import React from 'react'
import {useDataContext} from '../context/DataContext'
import { FaXmark } from 'react-icons/fa6'
import Signin from './Signin'


const createNavItems = (navData) => {

    const comps = navData.map((item, idx) => {
        return (
            <article key={idx} className='SideNav__article category'>
                <h2 className='category__h2'>{item['category']}</h2>
                <ul className='category__ul sb_list'>
                    {item['subItems'].map((navItem, idx) => {
                        return (
                            <li key={idx} className="sb_list__li">
                                <a href={navItem['url']}>{navItem['icon']} {navItem['label']}</a>
                            </li>
                        )
                    })}
                </ul>
            </article>
        )
        
    })

    return comps
}

const SideNav = () => {

    const { navData, sideNavOpen, handleToggleSideNav } = useDataContext()

    const sideNavClasses = 'SideNav' + (sideNavOpen ? ' SideNav_show':'')

  return (
    <nav className={sideNavClasses}>
        <div className="SideNav__header sb_header">
            <div className="sb_header__div sb-logo">
                <a className='sb-logo__a logo cursor_pointer' href="/home">
                    <img src="./images/logoipsum-289.svg" alt="logo" />
                </a>
            </div>
            <button className='sb_header__btn sb_close cursor_pointer' onClick={() => {handleToggleSideNav('close')}}>
                <FaXmark></FaXmark>
            </button>
        </div>
        <div className="SideNav__links">
            {createNavItems(navData)}
        </div>
        <div className="SideNav__signin">
            <Signin/>
        </div>
    </nav>
  )
}

export default SideNav