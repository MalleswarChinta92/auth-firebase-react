import React, { useState, useEffect, useContext } from 'react';
import {auth} from '../../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=> {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logOut = () => {
        return auth.logOut()
    }

    const value = {
        currentUser,
        signUp,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}