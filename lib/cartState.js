import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export const CartStateProvider = ({ children }) => {
    
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    }

    return <LocalStateProvider value={{ cartOpen, toggleCart }} >{children}</LocalStateProvider>;
}

export const useCart = () => {
    const state = useContext(LocalStateContext);
    return state;
};