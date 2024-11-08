import React from 'react'
import {FaCircleChevronLeft, FaCircleChevronRight} from 'react-icons/fa6'
import Review from './Review'

const createReviewComponents = (reviews, currIdx) => {
    let comps = []

    reviews.forEach((rev, idx) => {
        let revClass = 'nextRev'

        if (idx === currIdx) {
            revClass = 'currRev'
        } else if (idx === currIdx - 1 || (currIdx - 1 < 0 && idx === reviews.length - 1)) {
            revClass = 'prevRev'
        }

        comps.push(
            <Review
                review={rev}
                revClass={revClass}
            ></Review>
        )
    })

    return comps
}

const ReviewContainer = ( { reviews=[], currIdx=0 }) => {
  return (
    <section className='section_container'>
        <FaCircleChevronLeft className='nav_left'/>
        {reviews.length === 0 && <p className='section_container__none'>No Reviews</p>}
        {createReviewComponents(reviews, currIdx)}
        <FaCircleChevronRight className='nav_right'/>
    </section>
  )
}

export default ReviewContainer