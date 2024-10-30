import React from 'react'
import '../css/RefreshTours.css'

const RefreshTours = ( { handleRefreshTours } ) => {
  return (
    <button type='button' onClick={handleRefreshTours} className='refresh_tours__button cursor_pointer'>Refresh</button>
  )
}

export default RefreshTours