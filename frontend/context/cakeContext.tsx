import * as React from 'react'; 
import axios from 'axios'; 

// TYPES
import { Cake } from './types'; 

export type CakeContextType = {
    // STATE 
    cakes: Cake[];
    selectedCake: Cake; 

    // ACTIONS
}

const cakeContextDefault: CakeContextType = {
    cakes: [], 
    selectedCake: null, 
}


export const CakeContext = React.createContext<CakeContextType>(cakeContextDefault); 

const CakeContextProvider: React.FC = ({ children }) => {
    const [cakes, setCakes] = React.useState<Cake[]>([]); 
    const [selectedCake, setSelectedCake] = React.useState<Cake>(null); 

    return (
        <CakeContext.Provider value={{ cakes, selectedCake }}>
            { children }
        </CakeContext.Provider>
    )
}