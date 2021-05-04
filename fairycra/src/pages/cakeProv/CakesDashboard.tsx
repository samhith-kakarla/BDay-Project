import React, { useContext, useEffect } from 'react'; 

// CONTEXT
import OrdersContext from '../../context/providers/ordersContext'; 

const CakesDashboard: React.FC = () => {
    const { orders, getOrders } = useContext(OrdersContext); 

    useEffect(() => {
        // Get Orders Here
    }); 

    return (
        <div>
            {/* If orders recieved, then output orders, else output loading component */}
            <h1>CAKES DASHBOARD</h1>
        </div>
    )
}


export default CakesDashboard;