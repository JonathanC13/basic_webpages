import React from 'react'
import { useDataContext } from '../context/DataContext'
import { useEffect, useCallback } from 'react'

const Hero = () => {

  const {handleToggleSubmenu} = useDataContext()

  const closeSubmenu = useCallback(() => {
    handleToggleSubmenu('close')
  }, [handleToggleSubmenu]);

  useEffect(() => {
    const header = document.getElementById('Hero')
    header.addEventListener("mouseover", closeSubmenu)
    // header.addEventListener("focusin", closeSubmenu)

    const cleanUp = () => {
        //console.log("runs if a useEffect dep changes.")
        header.removeEventListener("mouseover", closeSubmenu)  // remove this specific listener
        // header.removeEventListener("focusin", closeSubmenu)  // remove this specific listener
    }

    return cleanUp; // exec the cleanUp func when the component is removed from the DOM
}, [closeSubmenu])

  return (
    <section id='Hero' className='Hero'>
      <div className="Hero__div">
        <h1>I am John Doe</h1>
        <p>Yappy yappa doo</p>
    </div>
    </section>
  )
}

export default Hero