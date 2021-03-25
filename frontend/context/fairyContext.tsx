import * as React from 'react'; 
import axios from 'axios'; 

// TYPES
import { Fairy } from './types'; 
import { Twin } from './types';
import { Cake } from './types'; 
import { Order } from './types'; 

export type FairyContextType = {
    // STATE
    fairy: Fairy; 
    matchedTwins: Twin[];
    selectedTwin: Twin; 
    selectedCake: Cake;
    order: Order; 

    // ACTIONS
}

const fairyContextDefault: FairyContextType = {
    // STATE
    fairy: null, 
    matchedTwins: [],
    selectedTwin: null,
    selectedCake: null,
    order: null,

    // ACTIONS
}


export const FairyContext = React.createContext<FairyContextType>(fairyContextDefault); 

export const FairyContextProvider: React.FC = ({ children }) => {
    const [fairy, setFairy] = React.useState<Fairy>(null); 
    const [matchedTwins, setMatchedTwins] = React.useState<Twin[]>([]); 
    const [selectedTwin, setSelectedTwin] = React.useState<Twin>(null); 
    const [selectedCake, setSelectedCake] = React.useState<Cake>(null); 
    const [order, setOrder] = React.useState<Order>(null); 

    return (
        <FairyContext.Provider value={{ 
            fairy, matchedTwins, selectedTwin, selectedCake, order 
        }}>
            { children }
        </FairyContext.Provider>
    )
}