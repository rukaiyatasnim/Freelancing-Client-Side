import React, { createContext, useEffect, useState } from 'react';
import app from './../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app); // Initialize auth at the top
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create a new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    throw new Error('This email is already in use. Please try logging in.');
                } else {
                    throw err; // Rethrow the error if it's not an email already in use
                }
            })
            .finally(() => setLoading(false)); // Reset loading state
    };

    // Sign in an existing user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); // Reset loading state
    };

    // Log out the user
    const logOut = () => {
        return signOut(auth).finally(() => setLoading(false)); // Reset loading state
    };

    // Google sign-in
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google sign-in error: ", error.message);
            throw error;
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Update user profile (name and photoURL)
    const updateUserProfile = (name, photoURL) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL
            })
                .then(() => {
                    setUser({
                        ...auth.currentUser,
                        displayName: name,
                        photoURL: photoURL
                    });
                })
                .catch((err) => {
                    console.error("Profile update error: ", err.message);
                    throw err;
                });
        }
    };

    // Monitor authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Stop loading once auth state is checked
        });

        // Cleanup the subscription on component unmount
        return () => {
            unsubscribe();
        };
    }, [auth]); // Add auth as dependency to avoid multiple calls

    // Provide auth data to children
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        signInWithGoogle, // Add the Google sign-in method
        updateUserProfile, // Add the updateUserProfile function
        loading,
        setLoading,
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;