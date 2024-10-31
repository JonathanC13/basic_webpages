import React from 'react'
import { useState } from 'react'
import Review from './Review'
import ReviewNagivate from './ReviewNagivate'

const ReviewContainer = ( {reviews} ) => {
    
  const [activeIndex, setActiveIndex] = useState(0)

  const handleIndexChange = (idx) => {
    if (idx >=0 && idx < reviews.length) {
        setActiveIndex(idx)
    }
  }

  const handleSurpriseMe = () => {
    while(true) {
        let newIndex = Math.floor(Math.random() * reviews.length);
        if (newIndex !== activeIndex) {
            handleIndexChange(newIndex);
            return
        }
    }
  }

  return (
    <section className='Review_section'>
        {!reviews.length ? (
            <p>No reviews</p>
        ) : (<>
                <Review 
                    activeIndex={activeIndex}
                    reviews={reviews}
                />
                <ReviewNagivate 
                    reviews={reviews}
                    activeIndex={activeIndex}
                    handleIndexChange={handleIndexChange}
                    handleSurpriseMe={handleSurpriseMe}
                />
            </>)
        }
    </section>
  )
}

export default ReviewContainer