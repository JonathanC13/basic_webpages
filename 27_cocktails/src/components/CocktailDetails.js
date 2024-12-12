import React from 'react'
import { useParams } from "react-router"
import { useGetSingleItemQuery } from '../store/slices/api/apiSlice'
import { useNavigate } from "react-router";

const getIngredients = (drink) => {
    const ingredients = []

    for (let [k, v] of Object.entries(drink)) {
        if (k.startsWith('strIngredient') && v !== null) {
            ingredients.push(v)
        }
    }

    return ingredients.join(' ')
}

const CocktailDetails = () => {

    let navigate = useNavigate();

    let params = useParams()
    const drinkId = params.id ? params.id : -1

    const { 
        data = [], 
        isLoading,
        isFetching, 
        isSuccess,
        isError,
        error
    } = useGetSingleItemQuery(drinkId)

    const drink = (isSuccess && data['drinks'] instanceof Array) ? data['drinks'][0] : null

    let render = ''
    if (isLoading || isFetching) {
        render = <p className='message'>LOADING</p>
    } else if (isError) {
        render = <p className='message'>Error: {error}</p>
    } else if (!isLoading && !isFetching && isSuccess && drink) {
        render =
            <>
                <h1 className="CocktailDetails__h1">{drink['strDrink']}</h1>
                <section className="CocktailDetails__section details">
                    <figure className='details__figure drink_dtl_fig'>
                        <img className='drink_dtl_fig__img' src={drink['strDrinkThumb']} alt="Drink thumbnail" />
                        <figcaption className='offscreen'>Drink thumbnail</figcaption>
                    </figure>
                    <section className="details__section info">
                        <div className="info__div info_line">
                            <p className="info_line__p info_title">Name:</p>
                            <p className="info_line__p info_val">{drink['strDrink']}</p>
                        </div>
                        <div className="info__div info_line">
                            <p className="info_line__p info_title">Category:</p>
                            <p className="info_line__p info_val">{drink['strCategory']}</p>
                        </div>
                        <div className="info__div info_line">
                            <p className="info_line__p info_title">Info:</p>
                            <p className="info_line__p info_val">{drink['strAlcholic']}</p>
                        </div>
                        <div className="info__div info_line">
                            <p className="info_line__p info_title">Glass:</p>
                            <p className="info_line__p info_val">{drink['strGlass']}</p>
                        </div>
                        <div className="info__div info_line">
                            <p className="info_line__p info_title">Instructions:</p>
                            <p className="info_line__p info_val">{drink['strInstructions']}</p>
                        </div>
                        <div className="info__div info_line">
                            <p className="info_line__p info_title">Ingredients:</p>
                            <p className="info_line__p info_val">{getIngredients(drink)}</p>
                        </div>
                    </section>
                </section>
            </>
    } else {
        render = <p className='message'>No data available.</p>
    }

  return (
    <section className='CocktailDetails'>
        <button className="CocktailDetails__btn go_home" type='button' onClick={() => {navigate('/')}}>BACK HOME</button>
        {render}
    </section>
  )
}

export default CocktailDetails