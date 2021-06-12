import React from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

// TYPES
import { Order } from '../../context/types'; 

// COMPONENTS
import FairyNav from '../../components/fairies/FairyNav'; 


const OrderCake: React.FC = () => {
    const { selectedTwin, selectedCake, setOrder } = useFairyContext(); 

    const newOrder: Order = {
        cakeID: "sjfkdsljf",
        address: "Address 1", 
    }

    function purchaseCake (order: Order) {
        setOrder(order); 
        firebase.firestore().collection('orders').add({
            cakeID: order.cakeID, 
            address: order.address, 
            complete: false, 
        }).then((doc) => {
            console.log(doc); 
            console.log("Order sent to DB"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Order not sent to DB"); 
        });
    }

    return (
        <div>
            <FairyNav />
            <h1>ORDER CAKE</h1>
            <button className="bg-gray-600 text-blue-500" onClick={() => purchaseCake(newOrder)}>ORDER</button>
        </div>
    )
}


export default OrderCake; 