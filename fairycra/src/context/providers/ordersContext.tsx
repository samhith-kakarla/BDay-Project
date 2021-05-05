import React, { useState, createContext, useContext } from 'react'; 
import firebase from '../../firebase/firebaseConfig'; 

// TYPES
import { Order } from '../types'; 


export type OrdersContextType = {
    // STATE 
    orders: Order[];

    // ACTIONS
    getOrders: () => void; // Only unfulfilled orders
    fulfillOrder: (order: Order) => void;
}

export const ordersContextDefault: OrdersContextType = {
    // STATE
    orders: [], 

    // ACTIONS
    getOrders: () => {}, 
    fulfillOrder: () => {},
}


export const OrdersContext = createContext<OrdersContextType>(ordersContextDefault); 
export const useOrdersContext = () => useContext(OrdersContext); 



const OrdersContextProvider: React.FC = ({ children }) => {
    const [orders, setOrders] = useState(ordersContextDefault.orders); 

    function getOrders () {
        firebase.firestore().collection('orders').where("complete", "==", "false").get().then((query) => {
            query.docs.forEach((doc) => {
                const order: Order = {
                    id: doc.id, 
                    cakeID: doc.data().cakeID, 
                    address: doc.data().address, 
                    complete: doc.data().complete, 
                }; 
                setOrders([...orders, order]); 
            }); 
        }).then(() => {
            console.log("Orders receieved!"); 
            console.log(orders); 
        }).catch((error) => {
            console.log(error);
            console.log("Orders not received :("); 
        });
    }

    function fulfillOrder (order: Order) {
        firebase.firestore().collection('orders').doc(order.id).update({
            complete: true
        }).then(() => {
            console.log("Order complete!");
        }).catch((error) => {
            console.log(error); 
            console.log("Order not marked complete :("); 
        });
    }

    return (
        <OrdersContext.Provider value={{ orders, getOrders, fulfillOrder }}>
            { children }
        </OrdersContext.Provider>
    )
}


export default OrdersContextProvider; 