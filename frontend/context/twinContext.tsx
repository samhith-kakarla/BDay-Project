import * as React from 'react';
import axios from 'axios'; 

// TYPES
import { Twin } from './types'; 


export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    
    // ACTIONS
}

const twinContextDefault: TwinContextType = {
    twins: [], 
}


export const TwinContext = React.createContext<TwinContextType>(twinContextDefault); 

const TwinContextProvider: React.FC = ({ children }) => {
    const [twins, setTwins] = React.useState<Twin[]>([]); 

    return (
        <TwinContext.Provider value={{ twins }}>
            { children }
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 