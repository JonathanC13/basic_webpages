import React from 'react'
import '../css/Tour.css'
import { useState, useEffect } from 'react'

const Tour = ( { tours, id, handleNotInterested} ) => {

    const tour = tours.find((tour) => (tour.id).toString() === id)

    const [readMore, setReadMore] = useState(false)

    const lenCap = 225
    const infoLenCap = (tour.info).length > lenCap

    // initial state of readMore
    useEffect(() => {
        
        setReadMore(!infoLenCap)
    }, [])

    const info = readMore ? (tour.info) : `${(tour.info).slice(0, lenCap)}...`;

    const handleToggleReadMore = () => {
        setReadMore(!readMore);
    }

  return (
    <article key={tour.id} className='tour_item'>
        <figure className='tour_item__figure'>
            <img src={tour.image} alt="tour location" title="tour location" name="tour location"/>
            <figcaption className='offscreen'>Tour location image</figcaption>
        </figure>
        <div className='tour_item__div tour_header'>
            <h3 className='tour_header__h3'>{tour.name}</h3>
            <p className='tour_header__p tour_price'>${tour.price}</p>
        </div>
        <p className='tour_item__info tour_info'>
            {info}
            &nbsp;
            {infoLenCap && <span className='tour_info__span cursor_pointer' onClick={handleToggleReadMore}>{readMore ? 'Show Less' : 'Read More'}</span>}
        </p>
        <button type='button' className='tour_item__button cursor_pointer' onClick={() => handleNotInterested(tour.id)}>
            Not Interested
        </button>
    </article>
  )
}

export default Tour