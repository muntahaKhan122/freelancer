import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, doc, setDoc, getDoc,updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

const initializeUser = async(user)=> {
    try{
     const userDocRef = doc(db, 'users', user.uid);
   await setDoc(userDocRef, {
     email: user.email,
     name: user.displayName,
     uid: user.uid,
     rate: "",
     summary: "",
     title:"",
     state:"",
     area:"",
     mobile_number:"",
     type:"",
     display_images:""
   });
    }catch(e){
     console.log(e);
    }
 }
export const signup = async (email,password,firstName,lastName) => {
  try {
  const res=await firebase.auth().createUserWithEmailAndPassword(email, password);
  const user=res.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}`});
  await initializeUser(user);
  return user;
  } catch (err){
    console.log(err);
  }
};



export const logout = async () => {
    firebase.auth().signOut()
    .then(() => {
        console.log("User signed out successfully");
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });
}

export const login = async (email, password) => {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return user; // Returns the user object on successful login
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Throws an error if login fails
    }
};
export const setUserAttributes = async(userId,userData) =>{
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, userData);
      console.log("User data set successfully");
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  }

export const getUserAttributes = async(userId) => {
    try {
        const userRef = doc(db, "users", userId); // Get a reference to the user document
        const userSnapshot = await getDoc(userRef); // Fetch the document
    
        if (userSnapshot.exists()) {
          return userSnapshot.data(); // Return the user data
        } else {
          console.log("No such user!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
}  
export const handleImageUpload = async (event,userId) => {
  const file = event.target.files[0];
  const storageRef = ref(storage, `users/${userId}/display-image`);

return uploadBytes(storageRef, file);

};
export const getImage = (userId) =>{
  return getDownloadURL(ref(storage, `users/${userId}/display-image`))
  .then((url) => url)
  .catch((e)=>{console.log("err",e); return null; });
}