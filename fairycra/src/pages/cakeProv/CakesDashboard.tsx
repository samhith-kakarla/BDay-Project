import React, { useContext, useEffect } from 'react'; 
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useOrdersContext } from '../../context/providers/ordersContext'; 

// TYPES
import { Order } from '../../context/types'; 

const CakesDashboard: React.FC = () => {
    const { orders, setOrders } = useOrdersContext(); 

    function getOrders () {
        firebase.firestore().collection('orders').where("complete", "==", false).get().then((query) => {
            console.log(query); 
            query.docs.forEach((doc) => {
                const order: Order = {
                    id: doc.id, 
                    cakeID: doc.data().cakeID, 
                    address: doc.data().address, 
                    complete: doc.data().complete, 
                }
                setOrders([...orders, order]); 
            });
            console.log(orders); 
            console.log("Got orders!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Error getting orders");
        });
    }

    useEffect(() => {
        getOrders();
    }, []); 

    return (
        <div>
            {/* If orders recieved, then output orders, else output loading component */}
            {orders ? orders.map((order) => (
                <div>
                    <p>{order.id}</p>
                    <p>{order.cakeID}</p>
                    <p>{order.address}</p>
                </div>
            )) : ""}
            <h1>CAKES DASHBOARD</h1>
        </div>
    )
}


export default CakesDashboard;