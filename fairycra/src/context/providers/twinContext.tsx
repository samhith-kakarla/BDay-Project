import React, { FC, useState, createContext } from 'react';

// TYPES
import { Twin } from '../types'; 


export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    currentTwin: Twin | null;
    
    // ACTIONS
    
}

const twinContextDefault: TwinContextType = {
    // STATE
    twins: [], 
    currentTwin: null,

    // ACTIONS
    
}


export const TwinContext = createContext<TwinContextType>(twinContextDefault); 

const TwinContextProvider: FC = ({ children }) => {
    const [twins, setTwins] = useState(twinContextDefault.twins); 
    const [currentTwin, setCurrentTwin] = useState(twinContextDefault.currentTwin);

    return (
        <TwinContext.Provider value={{ twins, currentTwin }}>
            { children }
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 