import React from 'react'
import './ColorDisplay.css';

const ColorDisplay = ( {color = ""} ) => {

    const colorName = color.length ? color : 'Empty Value'
    const bgColor = colorName === 'Empty Value' ? 'white' : colorName
    const newStyle = {
        backgroundColor: bgColor
    }
  return (
    <section className='colorDisplay' style={newStyle}>
        <p className="colorDisplay__p">{colorName}</p>
    </section>
  )
}

export default ColorDisplay