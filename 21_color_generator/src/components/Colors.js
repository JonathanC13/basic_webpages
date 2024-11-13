import React from 'react'
import ColorGroup from './ColorGroup'

const createColorGroupComps = (colors) => {
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
            />
        )
    })

    return comps
}

const Colors = ({colors=[]}) => {
  return (
    <section>
        {createColorGroupComps(colors)}
    </section>
  )
}

export default Colors