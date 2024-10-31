import React from 'react'
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

const ReviewNagivate = ( {reviews, activeIndex, handleIndexChange, handleSurpriseMe}) => {
  return (
    <section className='ReviewNavigate'>
        <section>
            {activeIndex > 0 ? (
                <FaLessThan className='nav_arrow cursor_pointer' onClick={() => handleIndexChange(activeIndex - 1)}/>
            ) : (
                <FaLessThan className='nav_arrow_disabled'/>
            )}
            {activeIndex < reviews.length - 1 ? (
                <FaGreaterThan className='nav_arrow cursor_pointer' onClick={() => handleIndexChange(activeIndex + 1)}/>
            ) : (
                <FaGreaterThan className='nav_arrow_disabled'/>
            )}
        </section>
        {reviews.length > 1 && <button type='button' className='Surprise cursor_pointer' onClick={handleSurpriseMe}>Surprise me!</button>}
    </section>
  )
}

export default ReviewNagivate