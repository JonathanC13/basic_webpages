import React from 'react'
import '../css/Tours.css'
import Tour from './Tour'
import RefreshTours from './RefreshTours'

// tour items
// reminder, do not create components in render function so this func does not have to re-mount
const tourComp = ( tours, handleNotInterested ) => {
    let tourCompArr = [];
    for (let i = 0; i < tours.length; i++) {
        tourCompArr.push(<Tour key={tours[i].id} id={tours[i].id} tours={tours} handleNotInterested={handleNotInterested} />);
    }
    return tourCompArr;
}

const Tours = ( {tours, handleNotInterested, isLoading, APIError, handleRefreshTours} ) => {

    const tourComponents = tourComp(tours, handleNotInterested);

  return (
    <section className='Tours'>
        <h2 className="offscreen">Tours List</h2>
        {isLoading && <p>Loading Tours!</p>}
        {APIError && <p style={{color:'red'}}>{APIError}</p>}
        {!isLoading && !APIError && tourComponents}
        {!isLoading && !APIError && !tourComponents.length && <RefreshTours handleRefreshTours={handleRefreshTours}></RefreshTours>}
    </section>
  )
}

export default Tours