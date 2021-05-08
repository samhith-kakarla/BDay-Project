import React, { useContext } from 'react';
import firebase from '../../firebase/firebaseConfig'; 

// CONTEXT
import { useTwinContext } from '../../context/providers/twinContext'; 

// TYPES
import { Twin, User } from '../../context/types'; 

const UploadTwinImages: React.FC = () => {
    const { twins, setTwins } = useTwinContext(); 

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
        <div>
            <h1>UPLOAD TWIN IMAGES</h1>
        </div>
    )
}


export default UploadTwinImages; 