import React from 'react'

const Header = ( {title='', colorStr='', setColorStr=()=>{}, changeColorHandler=()=>{}, inputMessage=''} ) => {
  return (
    <header className='head'>
        <h1 className='head__h1'>{title}</h1>
        <div className='head__div color'>
            <form className='color__form' onSubmit={(e) => {e.preventDefault()}}>
                <label htmlFor="color_value_input" className='color__form__label offscreen'>Enter color value</label>
                <input 
                    id='color_value_input' 
                    name='color__form__input' 
                    type="text" 
                    placeholder='#fd5e5'
                    value={colorStr}
                    onChange={(e)=>setColorStr(e.target.value)}
                />
                <button
                    type='submit' 
                    onClick={changeColorHandler}
                >Submit</button>
            </form>
        </div>
        <p className="head__p">{inputMessage}</p>
    </header>
  )
}

export default Header