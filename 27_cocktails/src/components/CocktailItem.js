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
                <img className='drink_fig__img' src={cocktail['strDrinkThumb']} alt="Drink thumbnail image" />
                <figcaption className='offscreen'>Drink thumbnail</figcaption>
            </figure>
            <h1 className='CocktailItem__h1 drink_name'>{cocktail['strDrink']}</h1>
            <p className='CocktailItem__p drink_glass'>{cocktail['strGlass']}</p>
            <p className='CocktailItem__p drink_alcho'>{cocktail['strAlcoholic']}</p>
            <button className='CocktailItem__button drink_details' type='button' onClick={() => {navigate(`/cocktail/${cocktail['idDrink']}`)}}>DETAILS</button>
            </>
        )}
        
    </section>
  )
}

export default CocktailItem