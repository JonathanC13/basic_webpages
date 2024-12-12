import React from 'react'
import { useNavigate } from "react-router";

const CocktailItem = ({cocktail = {}}) => {

    let navigate = useNavigate();

  return (
    <section className='CocktailItem'>
        {!cocktail.hasOwnProperty('idDrink') ? (
            <p className='message'>No data available.</p>
        ) : (
            <>
            <figure className="CoctailItem__figure drink_fig">
                <img className='drink_fig__img' src={cocktail['strDrinkThumb']} alt="Drink thumbnail" />
                <figcaption className='offscreen'>Drink thumbnail</figcaption>
            </figure>
            <section className='brief'>
                <h1 className='brief__h1 drink_name'>{cocktail['strDrink']}</h1>
                <p className='brief__p drink_glass'>{cocktail['strGlass']}</p>
                <p className='brief__p drink_alcho'>{cocktail['strAlcoholic']}</p>
                <button className='CocktailItem__button details_btn cursor_pointer' type='button' onClick={() => {navigate(`/cocktail/${cocktail['idDrink']}`)}}>DETAILS</button>
            </section>
            </>
        )}
        
    </section>
  )
}

export default CocktailItem