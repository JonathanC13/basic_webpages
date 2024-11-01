import React from 'react'
import { FaQuoteRight } from 'react-icons/fa'

const Review = ( { reviews, activeIndex }) => {

    const review = reviews[activeIndex]

  return (
    <article className='Review'>
        <figure className='Review__fig'>
            <img src={review.image} alt="User profile pic" title='User profile pic' />
            <figcaption className='offscreen'>User profile pic</figcaption>
            <div className='bg_quote'>
                <FaQuoteRight className='quote'/>
            </div>
        </figure>
        <h2 className='Review__name'>{review.name}</h2>
        <p className='Review__role'>{review.role}</p>
        <p className='Review__review'>{review.review}</p>
    </article>
  )
}

export default Review