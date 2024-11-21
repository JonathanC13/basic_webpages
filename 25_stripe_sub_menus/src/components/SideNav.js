import React from 'react'
import {useDataContext} from '../context/DataContext'
import { FaXmark, FaChevronRight } from 'react-icons/fa6'


const createNavItems = (navData) => {

    const comps = navData.map((item, idx) => {
        return (
            <article key={idx} className='SideNav__article category'>
                <h2 className='category__h2'>{item['category']}</h2>
                <ul className='category__ul sb_list'>
                    {item['navItems'].map((navItem, idx) => {
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
            <div className="sb_header__div logo">
                <img src="./images/logoipsum-286.svg" alt="logo" />
            </div>
            <button className='sb_header__btn sb_close cursor_pointer' onClick={() => {handleToggleSideNav('close')}}>
                <FaXmark></FaXmark>
            </button>
        </div>
        <div className="SideNav__links">
            {createNavItems(navData)}
        </div>
        <div className="SideNav__sign-in sign-in">
            <button className="sign-in__btn cursor_pointer">Sign in <FaChevronRight></FaChevronRight></button>
        </div>
    </nav>
  )
}

export default SideNav