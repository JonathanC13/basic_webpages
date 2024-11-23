import React from 'react'
import { useDataContext } from '../context/DataContext'
import { useEffect, useRef } from 'react'

const createSubItems = (subItems) => {
    const comps = subItems.map((item, idx) => {
        return (
            <li id='subItems__li' className='subItems__li' key={idx}>
                <a href={item['url']}>{item['icon']} {item['label']}</a>
            </li>
        )
    })
    return comps
}

const Submenu = () => {

    const {submenuOpen, navItem: {category, subItems}, location} = useDataContext()
    const submenuRef = useRef(null)

    const SubmenuClasses = 'Submenu' + (submenuOpen ? ' Submenu_show':'')

    // set the location of the section
    useEffect(() => {
        const submenu = submenuRef.current
        const { center, bottom } = location
        
        submenu.style.left = `${center}px`
        submenu.style.top = `${bottom}px`
    }, [category, subItems, location])

  return (
    <section id='Submenu' className={SubmenuClasses} ref={submenuRef}>
        <section className="Submenu_content">
            <h3 className="Submenu__h3">{category}</h3>
            <ul className="Submenu__ul subItems">
                {createSubItems(subItems)}
            </ul>
        </section>
    </section>
  )
}

export default Submenu