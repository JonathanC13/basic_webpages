import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchTerm: 'a',
    initialAppMount: true,  // Just used to hide the initial search term
    items: []
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
            // on first change of searchTerm, flip to false so that the controlled input will show the text
            state.initialAppMount = false
        },
        setData: (state, action) => {
            state.data = action.payload
        },

    }
})

export const { setSearchTerm, setData } = dataSlice.actions

export default dataSlice.reducer