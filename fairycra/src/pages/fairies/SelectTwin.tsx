import React, { useEffect } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

// TYPES
import { Twin } from '../../context/types'; 

const SelectTwin: React.FC = () => {
    const { fairy, matchedTwins, setMatchedTwins, setSelectedTwin } = useFairyContext(); 

    const twin: Twin = {
        id: 'px3qfBKuFNy3pwtkdHey', 
        name: "Twin 1", 
        age: 14, 
        address: "Address 1", 
        birthday: "12-22-2003", 
        cake_tags: ["chocolate", "strawberry", "vanilla"]
    }

    function getMatchedTwins (birthday: string) {
        firebase.firestore().collection('twins').where("birthday", "==", birthday).get().then((query) => {
            console.log(query); 
            query.docs.forEach((doc) => {
                const matchedTwin: Twin = {
                    id: doc.id, 
                    name: doc.data().name, 
                    age: doc.data().age, 
                    birthday: doc.data().birthday,
                    address: doc.data().address, 
                    cake_tags: doc.data().cake_tags,
                }
                setMatchedTwins([...matchedTwins, matchedTwin]); 
            });
            console.log(matchedTwins); 
            console.log("Got matched Twins!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Error getting matched twins");
        });
    }

    function selectATwin (twin: Twin) {
        setSelectedTwin(twin); 
        firebase.firestore().collection('twins').doc(twin.id).update({
            match: "samhith.kakarla@gmail.com", // fairy?.email
        }).then(() => {
            console.log("Twin Selected!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twin not selected"); 
        });
    }

    useEffect(() => {
        getMatchedTwins("12-22-2003");
    }, []);

    return (
        <div>
            <h1>SELECT TWIN</h1>
            <button className="bg-gray-600 text-blue-500" onClick={() => selectATwin(twin)}>SELECT</button>
        </div>
    )
}


export default SelectTwin; 