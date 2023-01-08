import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValueInState] = useState(()=> {
        if(!localStorage) return initialValue;
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue;
    })
    const setStoredValue = ( value: T) => {
        setStoredValueInState(value)
        localStorage.setItem(key, JSON.stringify(value))
    }
    return [storedValue, setStoredValue]
}

export default useLocalStorage

