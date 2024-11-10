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
                revClass={revClass}
            ></Review>
        )
    })

    return comps
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
    useEffect(() => {
        console.log('setup')
        let intervalID = setInterval(() => {
            handleIdxChange(currIdx + 1)
        }, 5000)

        const cleanup = () => {
            console.log('clean')
            clearInterval(intervalID)
        }

        return cleanup
    }, [currIdx, handleIdxChange])

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
        </>
        )}
    </section>
  )
}

export default ReviewContainer