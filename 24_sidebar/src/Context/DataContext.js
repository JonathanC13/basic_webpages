import {createContext, useContext, useState} from 'react'

const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const handleToggleSidebar = (action) => {
        if (action === 'open') {
            setSidebarOpen(true)
        } else {
            setSidebarOpen(false)
            return
        }
    }

    const handleToggleModal = (action) => {
        if (action === 'open') {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }
    
    return (
        <DataContext.Provider
            value={{
                sidebarOpen, handleToggleSidebar,
                modalOpen, handleToggleModal
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