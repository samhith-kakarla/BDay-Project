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
    matchedCakes: Cake[], 
    selectedCake: Cake;
    order: Order; 

    // ACTIONS
    becomeAFairy: (fairy: Fairy) => void;
    getMatchedTwins: (birthday: string) => void; 
    filterTwins: () => void; 
    selectATwin: (twin: Twin) => void; 
    getFilteredCakes: (tag1: string, tag2: string, tag3: string) => void; 
    selectACake: (cake: Cake) => void;
    purchaseCake: (order: Order) => void; 
}

const fairyContextDefault: FairyContextType = {
    // STATE
    fairy: null, 
    matchedTwins: [],
    selectedTwin: null,
    matchedCakes: [],
    selectedCake: null,
    order: null,

    // ACTIONS
    becomeAFairy: () => {}, 
    getMatchedTwins: () => {}, 
    filterTwins: () => {}, 
    getFilteredCakes: () => {}, 
    selectATwin: () => {}, 
    selectACake: () => {},
    purchaseCake: () => {}, 
}


export const FairyContext = React.createContext<FairyContextType>(fairyContextDefault); 

export const FairyContextProvider: React.FC = ({ children }) => {
    const [fairy, setFairy] = React.useState<Fairy>(null); 
    const [matchedTwins, setMatchedTwins] = React.useState<Twin[]>([]); 
    const [selectedTwin, setSelectedTwin] = React.useState<Twin>(null); 
    const [matchedCakes, setMatchedCakes] = React.useState<Cake[]>(null); 
    const [selectedCake, setSelectedCake] = React.useState<Cake>(null); 
    const [order, setOrder] = React.useState<Order>(null); 

    const becomeAFairy = (fairy: Fairy) => async () => {
        setFairy(fairy); 
    }   

    const getMatchedTwins = (birthday: string) => async () => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            } 
        }

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/get_matched_twins/${birthday}`, config);
            setMatchedTwins(res.data); 
        } catch (error) {
            console.log(error); 
            setMatchedTwins([]);
        }
    }

    const filterTwins = () => async () => {
        
    }

    const selectATwin = (twin: Twin) => async () => {
        setSelectedTwin(twin); 
    }

    const getFilteredCakes = (tag1: string, tag2: string, tag3: string) => async () => {
        const config = {
            headers: {
                'Accept': 'application/json', 
                'Content-type': 'application/json', 
            }
        }

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/cakes/?tags=${tag1},${tag2},${tag3}/`, config); 
            setMatchedCakes(res.data); 
        } catch (error) {
            console.log(error); 
            setMatchedCakes([]); 
        }
    }

    const selectACake = (cake: Cake) => async () => {
        setSelectedCake(cake); 
    }

    const purchaseCake = () => async () => {
        if (order) {
            const config = {
                headers: {
                    'Accept': 'application/json', 
                    'Content-type': 'application/json', 
                }
            }
    
            const body = JSON.stringify({ order }); 
    
            try {
                await axios.post('http://127.0.0.1:8000/api/send_order/', body, config); 
                setOrder(null);
            } catch (error) {
                console.log(error); 
            }
        }
    }


    return (
        <FairyContext.Provider value={{ 
            fairy, matchedTwins, selectedTwin, matchedCakes, selectedCake, order, 
            becomeAFairy, getMatchedTwins, filterTwins, selectATwin, getFilteredCakes, selectACake, purchaseCake 
        }}>
            { children }
        </FairyContext.Provider>
    )
}