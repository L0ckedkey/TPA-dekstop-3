import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currUser, setCurrenUser] = useState();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrenUser(user);
        })

        return unsub;
    }, []);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }


    const value = { currUser, signup }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}