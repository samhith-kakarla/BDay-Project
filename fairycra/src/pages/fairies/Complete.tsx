import React from 'react';

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

const Complete: React.FC = () => {
    const { fairy, selectedTwin, selectedCake, order } = useFairyContext(); 

    return (
        <div>
            {fairy?.name}
            {selectedTwin?.name}
            {selectedCake?.name}
            {order?.address}
            <h1>COMPLETE</h1>
        </div>
    )
}


export default Complete; 