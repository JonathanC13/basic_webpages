import {useEffect, useState} from 'react'

// custom hook
export default function useLocalStorage(key, defaultValue) {

    // getter 
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (err) {
            console.log(err.message)
            return defaultValue
        }
    });
  
    // setter
    // synchronize with external resources
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.log(err.message)
        }
    }, [key, value]);
  
    return [value, setValue];
}