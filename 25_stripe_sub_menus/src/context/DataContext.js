import {createContext, useContext, useState, useEffect} from 'react'
import {navItemsData} from '../data/data'
import useWindowWidth from '../hooks/useWindowWidth'

const DataContext = createContext({})

const DataProvider = ({children}) => {

    const [navData, setNavData] = useState([])
    const [sideNavOpen, setSideNavOpen] = useState(false)
    const {windowWidth} = useWindowWidth()

    const handleToggleSideNav = (action) => {
        if (action === 'open') {
            setSideNavOpen(true)
        } else {
            setSideNavOpen(false)
        }
    }

    useEffect(() => {
        setNavData(navItemsData)
    }, [setNavData])

    useEffect(() => {
        if (windowWidth > 769) {
            handleToggleSideNav('close')
        }
    }, [windowWidth, handleToggleSideNav])
    

    return (
        <DataContext.Provider
            value = {{
                navData, setNavData,
                sideNavOpen, handleToggleSideNav
            }}
        >
                {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    return useContext(DataContext)
}

export {DataContext, DataProvider}