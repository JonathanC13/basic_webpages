import React from 'react'
import {FaCircleUser} from 'react-icons/fa6'
import {links, social} from '../data/data'

const createNavLinks = () => {
    const comps = links.map(({id, url, text}) => {
        return (
        <li key={id}>
            <a href={url}>
                <span>{text}
                </span>
            </a>
        </li>
        )
    })

    return comps
}

const createSocialLinks = () => {

    const comps = social.map(({id, url, icon}) => {
        return (
        <li key={id}>
            <a href={url} target='_blank'>{icon}</a>
        </li>
        )
    })
    
    return comps
}

const Navbar = () => {

    const handleLogoClick = () => {
        console.log('logo clicked')
    }

  return (
    <header className='Navbar'>
        <div className='Logo cursor_pointer' onClick={handleLogoClick}>
            <FaCircleUser className='Logo__icon'></FaCircleUser>
            <h1 className='Logo__h1'>Hello</h1>
        </div>
        <div className='Links'>
            <ul className='NavLinks'>{createNavLinks()}</ul>
            <ul className='SocialLinks'>{createSocialLinks()}</ul>
        </div>
        <div className="header__div-btn">
            <button className="header__button icon cursor_pointer">
                <div className="header__button-nav-icon"></div>
            </button>
        </div>
    </header>
  )
}

export default Navbar