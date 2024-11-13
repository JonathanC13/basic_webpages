import React from 'react'
import Values from 'values.js';
import rgbToHex from '../utils/utils'

//rgbToHex

const ColorItem = ( {color={}}) => {
    const fontClass = (color['rgb'].reduce((accum, curr) => (accum = accum + curr))/2 > 255) ? 'font--dark' : 'font--light'

    const mystyle = {
        backgroundColor: `rgb(${color['rgb'].join(',')})`
      };

  return (
    <article style={mystyle} className={`colorItem ${fontClass}`}>
        <p className="colorItem__weight">{color['weight']} %</p>
        <p className="colorItem__hex">{rgbToHex(...color['rgb'])}</p>
    </article>
  )
}

export default ColorItem