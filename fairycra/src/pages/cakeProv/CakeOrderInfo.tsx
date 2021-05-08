import React from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useOrdersContext } from '../../context/providers/ordersContext'; 

// TYPES
import { Order } from '../../context/types'; 

const CakeOrderInfo: React.FC = () => {
    const order: Order = {
        id: "hkvJu1CkJDtJUnv5GuPf", 
        cakeID: "3jkdjsfl", 
        address: "Address 3", 
    }; 

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
        <div>
            <h1>CAKE ORDER INFO</h1>
            <button className="bg-gray-600 text-blue-500" onClick={() => fulfillOrder(order)}>SELECT</button>
        </div>
    )
}


export default CakeOrderInfo; 