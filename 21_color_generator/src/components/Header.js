import React from 'react'

const Header = ( {title='', colorStr='', setColorStr=()=>{}, changeColorHandler=()=>{}, inputMessage=''} ) => {

    const inputClassMod = (inputMessage !== '') ? 'red-border': ''

  return (
    <header className='head'>
        <h1 className='head__h1'>{title}</h1>
        <div className='head__div color'>
            <form className='color__form' onSubmit={(e) => {e.preventDefault()}}>
                <label htmlFor="color_value_input" className='color__form__label offscreen'>Enter color value</label>
                <input 
                    className={`color__form__input ${inputClassMod}`}
                    id='color_value_input' 
                    name='color__form__input' 
                    type="text" 
                    placeholder='#fd5e5'
                    value={colorStr}
                    onChange={(e)=>setColorStr(e.target.value)}
                />
                <button
                    className='color__form__btn cursor_pointer'
                    type='submit' 
                    onClick={changeColorHandler}
                >Submit</button>
            </form>
        </div>
        <p className="head__p" style={{color:'#61C9A8'}}>{inputMessage}</p>
    </header>
  )
}

export default Header