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

        const submenuId = document.getElementById('Submenu')
        if (submenuOpen) {
            if (submenu.style.left !== '0px') {
                // if not at default point, add transition so it will change over duration
                submenuId.classList.add('transition_left')
            }
            // set final position
            submenu.style.left = `${center}px`
            submenu.style.top = `${bottom}px`
        } else {
            // if submenuOpen is false, it is closed. return to 0,0 so I know it has resetted and remove transition so when it opens to new position it does not apply transition
            submenuId.classList.remove('transition_left')
            submenu.style.left = '0px'
            submenu.style.top = '0px'
        }
        
    }, [submenuOpen, category, subItems, location])

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