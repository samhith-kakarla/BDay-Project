import React, { useEffect } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useFairyContext } from '../../context/providers/fairyContext'; 

// TYPES
import { Cake, Twin } from '../../context/types'; 

// COMPONENTS
import FairyNav from '../../components/fairies/FairyNav'; 


const SelectCake: React.FC = () => {
    const { 
        selectedTwin, matchedCakes, setMatchedCakes, setSelectedCake 
    } = useFairyContext(); 

    // Images for each cake should be retrieved from Storage when getting matched cakes

    const twin: Twin = {
        id: 'px3qfBKuFNy3pwtkdHey', 
        name: "Twin 1", 
        age: 14, 
        address: "Address 1", 
        birthday: "12-22-2003", 
        cake_tags: ["chocolate", "strawberry", "vanilla"]
    };

    const cake: Cake = {
        id: "fjkdslfjs", 
        tag: "chocolate", 
        name: "Chocolate Cake", 
        price: 10.99, 
    };

    async function getFilteredCakes (tag1: string, tag2: string, tag3: string) {
        const tag1CakesRef = firebase.firestore().collection('cakes').where("tag", "==", tag1).get(); 
        const tag2CakesRef = firebase.firestore().collection('cakes').where("tag", "==", tag2).get(); 
        const tag3CakesRef = firebase.firestore().collection('cakes').where("tag", "==", tag3).get(); 

        const [tag1CakesSnapshot, tag2CakesSnapshot, tag3CakesSnapshot] = await Promise.all([
            tag1CakesRef, tag2CakesRef, tag3CakesRef
        ]);

        const tag1Cakes = tag1CakesSnapshot.docs; 
        const tag2Cakes = tag2CakesSnapshot.docs;
        const tag3Cakes = tag3CakesSnapshot.docs;
        const filteredCakes = tag1Cakes.concat(tag2Cakes).concat(tag3Cakes);
        console.log(filteredCakes); 

        filteredCakes.forEach((cake: any) => {
            setMatchedCakes([...matchedCakes, cake]); 
        }); 
    }

    function selectACake (cake: Cake) {
        setSelectedCake(cake); 
    }

    useEffect(() => {
        getFilteredCakes(
            twin.cake_tags[0], 
            twin.cake_tags[1], 
            twin.cake_tags[2], 
        ); 
    }, []); 

    return (
        <div>
            <FairyNav />
            <h1>SELECT CAKE</h1>
            <button className="bg-gray-600 text-blue-500" onClick={() => selectACake(cake)}>SELECT</button>
        </div>
    )
}


export default SelectCake; 