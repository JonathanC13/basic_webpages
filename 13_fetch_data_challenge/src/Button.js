import React from 'react'
import './Button.css'

const Button = ( {value = '', tabSelected = '', handleTabSelected = () => {}} ) => {

    const styleButtonColor = (thisButtonId, tabSelected) => {

        let buttonColor = 'rgb(255, 235, 205)';
        if (thisButtonId === tabSelected) {
          buttonColor = 'rgba(255, 235, 205, 80%)';
        }
    
        return {
          backgroundColor: buttonColor
        }
      }

  return (
    <button 
        className={value === tabSelected ? 'selected' : null}
        value={value}
        type="button" 
        aria-label={`change to ${value}`}
        onClick={(e) => {handleTabSelected(e.target.value)}}
        >
        {value}
    </button>
  )
}

export default Button