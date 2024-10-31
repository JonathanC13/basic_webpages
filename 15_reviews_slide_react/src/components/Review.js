import React from 'react'
import { FaQuoteRight } from 'react-icons/fa'

const Review = ( { reviews, activeIndex }) => {

    const review = reviews[activeIndex]

  return (
    <article className='Review'>
        <figure className='Review__fig'>
            <img src={review.image} alt="User image" title='User image' />
            <figcaption className='offscreen'>User image</figcaption>
            <div className='bg_quote'>
                <FaQuoteRight className='quote'/>
            </div>
        </figure>
        <h2>{review.name}</h2>
        <p className='Review__role'>{review.role}</p>
        <p>{review.review}</p>
    </article>
  )
}

export default Review