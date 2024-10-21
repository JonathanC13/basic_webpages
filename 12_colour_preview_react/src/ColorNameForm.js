import React from 'react'
import './ColorNameForm.css';

const ColorNameForm = ( {color = "", setColor = () => {}} ) => {
  return (
    <form className="colorNameForm" onSubmit={(e) => {e.preventDefault()}}>
        <label className='offscreen' htmlFor="AddColorName">Add Color Name</label>
        <input 
            type="text" 
            id="AddColorName"
            name="AddColorName"
            placeholder='Add color name'
            autoFocus
            role="AddColorName"
            value={color}
            onChange={(e) => {setColor(e.target.value)}}
        />
    </form>
  )
}

export default ColorNameForm