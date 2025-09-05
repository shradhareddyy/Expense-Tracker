import React,{createContext,useState,useEffect} from 'react';

export const UserContext=createContext();

const UserProvider = ({children}) => {
    const [user,setUser]=useState(null);

   //function to update user info
    const updateUser=(userData)=>{
     setUser(userData);
    };

    //function to clear user info on logout
    const clearUser=()=>{
        setUser(null);
    };

    return (
        <UserContext.Provider 
        value={
            {user,updateUser,clearUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;