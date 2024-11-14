import React from 'react'
import ColorGroup from './ColorGroup'
import {useState} from 'react'

const createColorGroupComps = (colors, copiedColor, handleColorItemClick) => {
    let comps = []
    const colorGroups = new Map()
    colors.forEach((color) => {
        colorGroups.has(color['type']) ? colorGroups.get(color['type']).push(color) : colorGroups.set(color['type'], [color])
    })

    colorGroups.forEach((value, key) => {
        comps.push(
            <ColorGroup
                key={key}
                type={key}
                colors={value}
                copiedColor={copiedColor}
                handleColorItemClick={handleColorItemClick}
            />
        )
    })

    return comps
}

const Colors = ({colors=[]}) => {

    const [copiedColor, setCopiedColor] = useState('')

    const handleColorItemClick = (colorHexAndWeight) => {
        // console.log(colorHexAndWeight)
        navigator.clipboard.writeText(colorHexAndWeight);
        setCopiedColor(colorHexAndWeight)
    }


  return (
    <section className='Colors'>
        {createColorGroupComps(colors, copiedColor, handleColorItemClick)}
    </section>
  )
}

export default Colors