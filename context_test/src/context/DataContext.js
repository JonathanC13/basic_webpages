import {createContext, useContext, useState} from 'react'

const DataContext = createContext({})

const DataProvider = ({children}) => {

    const [state1, setState1] = useState(0)
    const [state2, setState2] = useState(0)

    const handleState1 = () => {
        setState1(state1 + 1)
    }

    const handleState2 = () => {
        setState2(state2 + 1)
    }

    return (
        <DataContext.Provider
            value = {{
                state1, setState1, handleState1,
                state2, setState2, handleState2
            }}
        >
                {children}
        </DataContext.Provider>
    )

    // since it's rendering because its state has changed and not because of its parent rendering, and because a component cannot mutate its props, React won't render children.
    // That's it if it was a normal component. But since there is a context involved here, React will find all components that contain useContext(counterContext) and render them.
}

export const useDataContext = () => {
    return useContext(DataContext)
}

export {DataContext, DataProvider}