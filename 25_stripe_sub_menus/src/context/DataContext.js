import {createContext, useContext, useState, useEffect} from 'react'
import {navItemsData} from '../data/data'
import useWindowWidth from '../hooks/useWindowWidth'

const DataContext = createContext({})

const DataProvider = ({children}) => {

    const [navData, setNavData] = useState([])
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const [navItem, setNavItem] = useState({ category: '', subItems: [] });
    const [location, setLocation] = useState({});
    const [sideNavOpen, setSideNavOpen] = useState(false)

    const {windowWidth} = useWindowWidth()

    const handleToggleSideNav = (action) => {
        if (action === 'open') {
            setSideNavOpen(true)
        } else {
            setSideNavOpen(false)
        }
    }

    const handleToggleSubmenu = (action, obj = null) => {
        if (action === 'open') {
            const navItem = navData.find((item) => item['category'] === obj['category']);
            setNavItem(navItem);
            setLocation(obj['location']);
            setSubmenuOpen(true)
        } else {
            setSubmenuOpen(false)
        }
    }

    // sync for external resource for data. OK use of useEffect
    useEffect(() => {
        setNavData(navItemsData)
    }, [setNavData])

    // sync for external interaction. OK use of useEffect
    useEffect(() => {
        if (windowWidth >= 769) {
            handleToggleSideNav('close')
        } else if (windowWidth < 769) {
            handleToggleSubmenu('close')
        }
    }, [windowWidth, handleToggleSideNav])

    return (
        <DataContext.Provider
            value = {{
                navData, setNavData,
                submenuOpen, handleToggleSubmenu,
                navItem, location,
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