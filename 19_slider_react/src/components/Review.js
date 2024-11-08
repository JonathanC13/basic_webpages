import React from 'react'
import {FaQuoteRight} from 'react-icons/fa6'

const Review = ({review={}, revClass=''}) => {
    const artClass = 'review ' + revClass

  return (
    <article className={artClass}>
        <figure className='review__figure profilePic'>
            <img className='profilePic__img' src={review['img']} alt={review['name']} />
            <figcaption className='offscreen'>{review['name']}</figcaption>
        </figure>
        <h2 className="review__h2">{review['name']}</h2>
        <p className="review__role">{review['role']}</p>
        <p className="review__content">{review['review']}</p>
        <FaQuoteRight className='review__quote'/>
    </article>
  )
}

export default Review