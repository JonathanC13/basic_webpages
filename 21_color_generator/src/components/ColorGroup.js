import React from 'react'
import ColorItem from './ColorItem'

const createColorItems = (colors) => {
  let comps = []

  colors.forEach((color, i) => {
    comps.push(
      <ColorItem
        key={i}
        color={color}
      />
    )
  })

  return comps
}


const ColorGroup = ({type='', colors=[]}) => {
  return (
    <section>
      <h2>{type}</h2>
      {createColorItems(colors)}
    </section>
  )
}

export default ColorGroup