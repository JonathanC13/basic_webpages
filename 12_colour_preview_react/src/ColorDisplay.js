import React from 'react'
import './ColorDisplay.css';

const ColorDisplay = ( {color = "", hexValue = "", isDarkText = true} ) => {

    const colorName = color.length ? color : 'Empty Value'
    const bgColor = colorName === 'Empty Value' ? 'white' : colorName

    const hexColor = hexValue.length ? hexValue : null

    const newStyle = {
        backgroundColor: bgColor,
        color: isDarkText ? 'black' : 'papayawhip'
    }
    
  return (
    <section className='colorDisplay' style={newStyle}>
        <p className="colorDisplay__p">{colorName}</p>
        <p className="colorDisplay__p">{hexColor}</p>
    </section>
  )
}

export default ColorDisplay