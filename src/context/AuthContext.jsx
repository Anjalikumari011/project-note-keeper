import { createContext, useContext,useState,useEffect } from "react";

const AuthContext=createContext();   //Creates an empty authentication context. This will be shared across components.

export const AuthProvider=({ children})=>{    //Declares AuthProvider component which wraps your entire app (or a part of it) to provide authentication values.
    const [user, setUser]=useState(null);     //user holds the currently logged-in user’s data (like token, email, etc.).
    const[loading, setLoading] = useState(true);     //loading is true until we finish checking for an existing logged-in user in localStorage.

    useEffect(()=>{
        const stored =localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));     //doubt
        setLoading(false);
    },[]);

    const login= (userData)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));    //doubt
    };

    const logout=()=>{
        setUser(null);
        localStorage.removeItem("user");     //Clears the user from state and from localStorage — logs the user out.
    };

    return(
        <AuthContext.Provider value={{user,login,logout, loading}}>
            {children}
            </AuthContext.Provider> //Wraps the app with AuthContext.Provider, making user, login, logout, and loading available to all child components.

    );
};
export const useAuth=()=> useContext(AuthContext);
export default AuthContext;
