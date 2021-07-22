import { firebaseFirestore } from './firebaseConfig';

export function becomeAFairy (fairy, setFairy) {
  firebaseFirestore().collection('fairys').add({
    name: fairy.name, email: fairy.email, birthday: fairy.birthday, 
  }).then((doc) => {
    console.log(doc.id); 
    const newFairy = {
        id: doc.id, name: fairy.name, email: fairy.email, birthday: fairy.birthday
    }; 
    setFairy(newFairy); 
    console.log(fairy);
  }).catch((error) => {
    console.log(error); 
    console.log("Fairy not added"); 
  });
};