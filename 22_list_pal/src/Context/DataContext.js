import { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    // const [listItems, setListItems] = useState([])
    const [listItems, setListItems] = useLocalStorage('myLocalList', [])

    return (
        <DataContext.Provider value={{
            listItems, setListItems
        }}>
            {children}
        </DataContext.Provider>
    ) 
}

export default DataContext