import React, { FC, useState, createContext } from 'react'; 

// TYPES
import { Cake } from '../types'; 


export type OrdersContextType = {
    // STATE 
    orders: Cake[];

    // ACTIONS
}

const ordersContextDefault: OrdersContextType = {
    orders: [], 
}


export const OrdersContext = React.createContext<OrdersContextType>(ordersContextDefault); 

const OrdersContextProvider: React.FC = ({ children }) => {
    const [orders, setOrders] = useState(ordersContextDefault.orders); 

    return (
        <OrdersContext.Provider value={{ orders }}>
            { children }
        </OrdersContext.Provider>
    )
}


export default OrdersContextProvider; 