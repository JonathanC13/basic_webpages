import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchTerm: 'a',
    items: []
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setSearchTerm, setData } = dataSlice.actions

export default dataSlice.reducer