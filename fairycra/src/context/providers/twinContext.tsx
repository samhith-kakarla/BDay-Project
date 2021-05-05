import React, { FC, useState, createContext, useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// TYPES
import { Twin } from '../types'; 


export type TwinContextType = {
    // STATE
    twins: Twin[]; 
    
    // ACTIONS
    getMyTwins: (ownerID: string) => void; // Firestore
    addNewTwin: (ownerID: string, twin: Twin) => void; // Firestore
    updateTwinInfo: (twin: Twin) => void; // Firestore
    deleteTwin: (twin: Twin) => void; // Firestore
    updateTwinImages: (twin: Twin, files: any[]) => void; // Storage (Images)
    getTwinImages: (twin: Twin) => void; // Storage (Images)
}

export const twinContextDefault: TwinContextType = {
    // STATE
    twins: [], 

    // ACTIONS
    getMyTwins: () => {}, 
    addNewTwin: () => {},
    updateTwinInfo: () => {}, 
    deleteTwin: () => {},
    updateTwinImages: () => {}, 
    getTwinImages: () => {},
}


export const TwinContext = createContext<TwinContextType>(twinContextDefault); 
export const useTwinContext = () => useContext(TwinContext); 



const TwinContextProvider: FC = ({ children }) => {
    const [twins, setTwins] = useState(twinContextDefault.twins); 

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
    }

    function addNewTwin (ownerID: string, twin: Twin) {
        firebase.firestore().collection('twins').add({
            owner: ownerID, 
            name: twin.name, 
            age: twin.age, 
            birthday: twin.birthday, 
            address: twin.address, 
            cake_tags: twin.cake_tags, 
            match : "", 
        }).then((doc: any) => {
            console.log(doc); 
            setTwins([...twins, doc]); 
            console.log("Twin added!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twin not added"); 
        }); 
    }

    function updateTwinInfo (twin: Twin) {
        firebase.firestore().collection('twins').doc(twin.id).update({ ...twin }).then(() => {
            console.log("Twin updated!"); 
        }).catch((error) => {
            console.log(error); 
            console.log("Twin failed to update :(");
        });
    }

    function deleteTwin (twin: Twin) {
        firebase.firestore().collection('twins').doc(twin.id).delete().then(() => {
            console.log("Twin deleted!");
        }).catch((error) => {
            console.log(error); 
            console.log("Twin not deleted :("); 
        })
    }

    function updateTwinImages (twin: Twin, files: any[]) {
        const metadata: any = { twin_id: twin.id }; 
        const storageRef = firebase.storage().ref(); 
        const promises = []; 
        
        files.forEach((file) => {
            const uploadTask = storageRef.put(file, metadata); 
            promises.push(uploadTask); 
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED, 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done'); 
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                          console.log('Upload is paused');
                          break;
                        case firebase.storage.TaskState.RUNNING:
                          console.log('Upload is running');
                          break;
                    }
                }, 
                (error) => {
                    console.log(error.code); 
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            ); 
        }); 
    }

    async function getTwinImages (twin: Twin) {
        const twinImagesRef = await firebase.storage().ref('images/twin_images').listAll(); 
        const twinImagesURLs: any[] = []; 

        twinImagesRef.items.forEach((file) => {
            let twinImageMetadata: any;
            file.getMetadata().then((metadata) => {
                console.log("Metadata retrieved!"); 
                twinImageMetadata = metadata; 
            }).then(() => {
                if (twinImageMetadata.twin_id === twin.id) {
                    file.getDownloadURL().then((url) => {
                        twinImagesURLs.push(url); 
                        console.log("Success downloading image!"); 
                    }).catch((error) => {
                        console.log(error.code); 
                        console.log("Could not download image :("); 
                    }); 
                }
            }).catch((error) => {
                console.log(error); 
                console.log("Could not retrieve metadata"); 
            }); 
        }); 
    }

    return (
        <TwinContext.Provider value={{ 
            twins,
            getMyTwins, addNewTwin, updateTwinInfo, deleteTwin, 
            updateTwinImages, getTwinImages
        }}>
            { children }
        </TwinContext.Provider>
    )
}


export default TwinContextProvider; 