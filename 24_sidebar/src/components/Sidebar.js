import React from 'react'
import { useDataContext } from '../Context/DataContext'
import { links, social } from '../data/data'

const createLinks = () => {
    const comps = links.map(({id, url, text, icon}) => {
        return (
            <li className='links__li' key={id}>
                <a href={url} className='cursor_pointer'>
                    {icon}
                    <span>{text}</span>
                </a>
            </li>
        )
    })

    return comps
}

const createSocials = () => {
    const comps = social.map(({id, url, icon}) => {
        return (
            <li className='Socials__li' key={id}>
                <a href={url} className='cursor_pointer' target='_blank'>{icon}</a>
            </li>
        )
    })

    return comps
}

const Sidebar = () => {

    const {sidebarOpen, handleToggleSidebar} = useDataContext();

    const sidebarClasses = 'Sidebar' + (sidebarOpen ? ' show_sidebar' : '')

  return (
    <section className={sidebarClasses}>
        <div className="Sidebar__header head">
            <img className='head__img' src = "/images/logoipsum-288.svg" alt="My Happy SVG"/>
            <div className="head__div close_sb">
                <button className='close_sb__btn cursor_pointer' onClick={() => {return handleToggleSidebar('close')}}>
                    <div className="close_sb__btn-icon"></div>
                </button>
            </div>
        </div>
        <ul className='Sidebar__links links'>
            {createLinks()}
        </ul>
        <ul className="Sidebar__socials social">
            {createSocials()}
        </ul>
    </section>
  )
}

export default Sidebar