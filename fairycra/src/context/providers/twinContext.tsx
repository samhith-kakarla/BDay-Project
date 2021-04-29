import React, { FC, useState, createContext } from 'react';

// TYPES
import { Twin } from '../types'; 


export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    currentTwin: Twin | null;
    
    // ACTIONS
    getMyTwins: (ownerID: string) => void;
}

const twinContextDefault: TwinContextType = {
    // STATE
    twins: [], 
    currentTwin: null,

    // ACTIONS
    getMyTwins: () => {}, 
}


export const TwinContext = createContext<TwinContextType>(twinContextDefault); 

const TwinContextProvider: FC = ({ children }) => {
    const [twins, setTwins] = useState(twinContextDefault.twins); 
    const [currentTwin, setCurrentTwin] = useState(twinContextDefault.currentTwin);

    function getMyTwins (owner: string) {
        
    }

    return (
        <TwinContext.Provider value={{ 
            twins, currentTwin, 
            getMyTwins, 
        }}>
            { children }
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 