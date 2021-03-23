import * as React from 'react';
import axios from 'axios'; 

// TYPES
import { Twin } from './types'; 

export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    selectedTwin: Twin; 
    // ACTIONS
}

const twinContextDefault: TwinContextType = {
    twins: [], 
    selectedTwin: null,
}


export const TwinContext = React.createContext<TwinContextType>(twinContextDefault); 

const TwinContextProvider: React.FC = ({ children }) => {
    const [twins, setTwins] = React.useState<Twin[]>([]); 
    const [selectedTwin, setSelectedTwin] = React.useState<Twin>(null); 

    return (
        <TwinContext.Provider value={{ twins, selectedTwin }}>
            {children}
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 