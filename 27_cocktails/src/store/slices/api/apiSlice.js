import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Use the `data` type we've already defined in `postsSlice`, (has searchTerm)
// and then re-export it for ease of use
// import { data } from '../dataSlice/dataSlice'
// export { data }

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with
    baseQuery: fetchBaseQuery({baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1'}),
    // The "endpoints" represent operations and requests for this server
    tagTypes: ['Items'],
    endpoints: (build) => ({
        // The `getItems` endpoint is a "query" operation that returns data in the result object
        getItems: build.query({
            query: (searchTerm) => `search.php?s=${searchTerm}`,
            providesTags: ['Items'],
        }),
        getSingleItem: build.query({
            query: (id) => `lookup.php?i=17222`,
            providesTags: ['Item']
        })
      })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetItemsQuery, useGetSingleItemQuery } = apiSlice