import React, { FC, useState, createContext } from 'react'; 
import firebase from '../../firebase/firebaseConfig'; 

// TYPES
import { Cake } from '../types'; 
import { Order } from '../types'; 


export type OrdersContextType = {
    // STATE 
    orders: Cake[];

    // ACTIONS
    getOrders: () => void; // Only unfulfilled orders
    fulfillOrder: (order: Order) => void;
}

const ordersContextDefault: OrdersContextType = {
    // STATE
    orders: [], 

    // ACTIONS
    getOrders: () => {}, 
    fulfillOrder: () => {},
}


export const OrdersContext = React.createContext<OrdersContextType>(ordersContextDefault); 

const OrdersContextProvider: React.FC = ({ children }) => {
    const [orders, setOrders] = useState(ordersContextDefault.orders); 

    function getOrders () {

    }

    function fulfillOrder (order: Order) {

    }

    return (
        <OrdersContext.Provider value={{ orders, getOrders, fulfillOrder }}>
            { children }
        </OrdersContext.Provider>
    )
}


export default OrdersContextProvider; 