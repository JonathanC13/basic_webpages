import React from 'react'
import { useDataContext } from '../context/DataContext';
import { useEffect, useCallback } from 'react'

const TopNavItems = ({item}) => {

    const { handleToggleSubmenu } = useDataContext();

    const displaySubmenu = useCallback((e) => {
        const category = e.target.textContent;
        const navBtn = e.target.getBoundingClientRect();
        const center = navBtn.left + (navBtn.right - navBtn.left) / 2;
        const bottom = navBtn.bottom - 3;
        handleToggleSubmenu('open', { category:category, location: { center:center, bottom:bottom }});
    }, [handleToggleSubmenu]);

    //set the submenu properties and renders
    useEffect(() => {
        const navItems = Array.from(document.getElementsByClassName('TopNavItem__btn'))
        navItems.forEach((item) => {
            item.addEventListener("mouseover", displaySubmenu)
            item.addEventListener("focusin", displaySubmenu)
        })
        
        const cleanUp = () => {
            navItems.forEach((item) => {
                item.removeEventListener("mouseover", displaySubmenu)  // remove this specific listener
                item.removeEventListener("focusin", displaySubmenu)  // remove this specific listener
            })
            
        }

        return cleanUp; // exec the cleanUp func when the component is removed from the DOM
    }, [displaySubmenu])

  return (
    <li className='TopNavItem cursor_def'>
        <button className='TopNavItem__btn'>{item['category'] }</button>
    </li>
  )
}

export default TopNavItems