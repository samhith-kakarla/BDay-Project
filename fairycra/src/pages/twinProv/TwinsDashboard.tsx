import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useTwinContext } from '../../context/providers/twinContext'; 

// TYPES
import { Twin, User } from '../../context/types'; 

const TwinsDashboard: React.FC = () => {
    const { twins, setTwins } = useTwinContext(); 

    function getMyTwins (ownerID: string) {
        firebase.firestore().collection('twins').where("owner", "==", ownerID).get().then((query) => {
            console.log(query); 
            query.docs.forEach((doc) => {
                const myTwin: Twin = {
                    id: doc.id, 
                    name: doc.data().name, 
                    age: doc.data().age, 
                    birthday: doc.data().birthday,
                    address: doc.data().address, 
                    cake_tags: doc.data().cake_tags,
                    match: doc.data().match, 
                }; 
                setTwins([...twins, myTwin]); 
            }); 
        }).then(() => {
            console.log(twins); 
            console.log("My Twins receieved!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twins not received :("); 
            setTwins([]); 
        });
    };

    return (
        <div>
            <h1>TWINS DASHBOARD</h1>
        </div>
    )
}


export default TwinsDashboard; 