import React from 'react'
import { useNavigate } from 'react-router-dom'

const Missing = () => {

    let navigate = useNavigate()

  return (
    <section className='Missing'>
        <h1 className='Missing__h1 message'>Oops, this page is not valid!</h1>
        <button className="CocktailDetails__btn go_home" type='button' onClick={() => {navigate('/Home')}}>BACK HOME</button>
    </section>
  )
}

export default Missing