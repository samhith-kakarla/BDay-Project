import * as React from 'react';
import axios from 'axios'; 

// TYPES
import { Twin } from './types'; 


export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    currentTwin: Twin;
    
    // ACTIONS
    
}

const twinContextDefault: TwinContextType = {
    // STATE
    twins: [], 
    currentTwin: null,

    // ACTIONS
    
}


export const TwinContext = React.createContext<TwinContextType>(twinContextDefault); 

const TwinContextProvider: React.FC = ({ children }) => {
    const [twins, setTwins] = React.useState<Twin[]>([]); 
    const [currentTwin, setCurrentTwin] = React.useState<Twin>(null);

    return (
        <TwinContext.Provider value={{ twins, currentTwin }}>
            { children }
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 