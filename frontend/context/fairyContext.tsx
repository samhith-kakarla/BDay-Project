import * as React from 'react'; 
import axios from 'axios'; 

// TYPES
import { Fairy } from './types'; 


export type FairyContextType = {
    // STATE
    fairy: Fairy; 

    // ACTIONS
}

const fairyContextDefault: FairyContextType = {
    fairy: null, 
}


export const FairyContext = React.createContext<FairyContextType>(fairyContextDefault); 

export const FairyContextProvider: React.FC = ({ children }) => {
    const [fairy, setFairy] = React.useState<Fairy>(null); 

    return (
        <FairyContext.Provider value={{ fairy }}>
            { children }
        </FairyContext.Provider>
    )
}