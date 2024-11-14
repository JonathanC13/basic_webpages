import React from 'react'
import rgbToHex from '../utils/utils'

//rgbToHex

const ColorItem = ( {color={}, copiedColor='', handleColorItemClick=()=>{}}) => {
    const fontClass = (color['rgb'].reduce((accum, curr) => (accum = accum + curr))/2 > 255) ? 'font--dark' : 'font--light'

    const mystyle = {
      backgroundColor: `rgb(${color['rgb'].join(',')})`
    };

    const colorHex = rgbToHex(...color['rgb'])


  return (
    <article style={mystyle} className={`colorItem cursor_pointer ${fontClass}`} onClick={()=>{handleColorItemClick([colorHex, color['weight']].join(','))}}>
        <p className="colorItem__weight">{color['weight']} %</p>
        <p className="colorItem__hex">{colorHex}</p>
        {copiedColor === [colorHex, color['weight']].join(',') && <p className='colorItem__msg'>Copied to clipboard</p>}
        
    </article>
  )
}

export default ColorItem