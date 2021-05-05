import React, { useContext } from 'react';

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

const Home: React.FC = () => {
    const { fairy, setFairy } = useFairyContext();  
    
    return (
        <div>
            <h1>HOME</h1>
            <h1>{fairy}</h1>
        </div>
    )
}


export default Home; 