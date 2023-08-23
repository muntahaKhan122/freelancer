import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import firebase from 'firebase/compat/app';

export const UserContext = createContext({});
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      console.log(user);

    });
    // Cleanup the onAuthStateChanged listener on component unmount
    return () => unsubscribe();

  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount.

  
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
