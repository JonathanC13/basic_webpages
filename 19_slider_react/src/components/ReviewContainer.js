import React from 'react'
import {FaCircleChevronLeft, FaCircleChevronRight} from 'react-icons/fa6'
import Review from './Review'
import {useState, useEffect, useCallback} from 'react'

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
                key={rev['id']}
                review={rev}
                revClass={'review' + ' ' + revClass}
            ></Review>
        )
    })

    return comps
}

/**
 * Gets the max length review and creates a position that is not absolute so that the parent container can encase this child. This ensures that all reviews will fit within the review container.
 * @param {*} reviews 
 * @returns JSX
 */
const maxReviewHeightComp = (reviews) => {
    let maxLen = 0
    let maxLenIdx = 0

    reviews.forEach((rev, idx) => {
        if (rev['review'].length > maxLen) {
            maxLen = Math.max(maxLen, rev['review'].length)
            maxLenIdx = idx
        }
    })

    return <Review
                key={reviews[maxLenIdx]['id']}
                review={reviews[maxLenIdx]}
                revClass={'hidden_review'}
            ></Review>
}

const ReviewContainer = ( { reviews=[] }) => {

    const [currIdx, setCurrIdx] = useState(0)

    const handleIdxChange = useCallback((idx) => {
        if (idx < 0) {
            setCurrIdx(reviews.length - 1)
        } else if (idx >= reviews.length) {
            setCurrIdx(0)
        } else {
            setCurrIdx(idx)
        }
    }, [reviews.length, setCurrIdx])

    // on each currIdx change the cleanup is called and then the setup is called.
    // useEffect(() => {
    //     let intervalID = setInterval(() => {
    //         handleIdxChange(currIdx + 1)
    //     }, 5000)

    //     const cleanup = () => {
    //         clearInterval(intervalID)
    //     }

    //     return cleanup
    // }, [currIdx, handleIdxChange])

  return (
    <section className='section_container'>
        {reviews.length === 0 && <p className='section_container__none'>No Reviews</p>}
        {reviews.length !== 0 && (
        <>
            <FaCircleChevronLeft 
                className='nav_left cursor_pointer'
                onClick={() => {handleIdxChange(currIdx - 1)}}
            />
            {createReviewComponents(reviews, currIdx)}
            <FaCircleChevronRight 
                className='nav_right cursor_pointer'
                onClick={() => {handleIdxChange(currIdx + 1)}}
            />
            {maxReviewHeightComp(reviews)}
        </>
        )}
    </section>
  )
}

export default ReviewContainer