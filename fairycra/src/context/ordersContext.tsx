import * as React from 'react'; 
import axios from 'axios'; 

// TYPES
import { Cake } from './types'; 


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
    const [orders, setOrders] = React.useState<Cake[]>([]); 

    return (
        <OrdersContext.Provider value={{ orders }}>
            { children }
        </OrdersContext.Provider>
    )
}