import React from 'react'
import ColorItem from './ColorItem'

const createColorItems = (colors, copiedColor, handleColorItemClick) => {
  let comps = []

  colors.forEach((color, i) => {
    comps.push(
      <ColorItem
        key={i}
        color={color}
        copiedColor={copiedColor}
        handleColorItemClick={handleColorItemClick}
      />
    )
  })

  return comps
}


const ColorGroup = ({type='', colors=[], copiedColor='', handleColorItemClick=()=>{}}) => {
  return (
    <section className='ColorGroup'>
      <h2>{type}</h2>
      <section className="ColorGroup__items">{createColorItems(colors, copiedColor, handleColorItemClick)}</section>
    </section>
  )
}

export default ColorGroup