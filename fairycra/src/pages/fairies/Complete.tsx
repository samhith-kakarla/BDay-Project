import React from 'react';

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

// COMPONENTS
import FairyNav from '../../components/fairies/FairyNav'; 


const Complete: React.FC = () => {
    const { fairy, selectedTwin, selectedCake, order } = useFairyContext(); 

    return (
        <div>
            <FairyNav />
            {fairy?.name}
            {selectedTwin?.name}
            {selectedCake?.name}
            {order?.address}
            <h1>COMPLETE</h1>
        </div>
    )
}


export default Complete; 