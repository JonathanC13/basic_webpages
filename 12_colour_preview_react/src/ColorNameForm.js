import React from 'react'
import './ColorNameForm.css';
import colorNames from 'colornames';
import { useRef } from 'react'

const ColorNameForm = ( {color = "", setColor = () => {}, setHexValue = () => {}, isDarkText = true, setIsDarkText = () => {}} ) => {
  
  const inputRef = useRef();  // to re-focus on the input after onClick button
  
  return (
    <form className="colorNameForm" onSubmit={(e) => {e.preventDefault()}}>
        <label className='offscreen' htmlFor="AddColorName">Add Color Name</label>
        <input 
            ref={inputRef}
            type="text" 
            id="AddColorName"
            name="AddColorName"
            placeholder='Add color name'
            autoFocus
            role="AddColorName"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setHexValue(colorNames(e.target.value));
            }}
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsDarkText(!isDarkText);
            inputRef.current.focus();
          }}
        >Toggle text color!</button>
    </form>
  )
}

export default ColorNameForm