import { configureStore } from '@reduxjs/toolkit'
// import searchTermReducer from './slices/searchTermSlice/searchTermSlice'
import dataReducer from './slices/dataSlice/dataSlice'

export default configureStore({
  reducer: {
    data: dataReducer,
  },
})