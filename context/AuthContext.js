'use client'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import React, {useContext, useState, useEffect} from 'react'
import { auth, db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children}) {

    const [currentUser,setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)

    //AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try{
                //Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log('No User Found')
                    return
                }

                //if user exists, fetch data from firestore db
                console.log('Fetching User Data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('Found User Data')
                    firebaseData = docSnap.data()
                    console.log('FirebaseData')
                }
                setUserDataObj(firebaseData)
            } catch(err) {
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}