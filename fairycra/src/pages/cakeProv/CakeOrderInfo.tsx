import React, { useContext } from 'react'; 

// CONTEXT
import OrdersContext from '../../context/providers/ordersContext'; 

const CakeOrderInfo: React.FC = () => {
    const { fulfillOrder } = useContext(OrdersContext);
    
    return (
        <div>
            
        </div>
    )
}


export default CakeOrderInfo; 