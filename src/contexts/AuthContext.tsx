import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

// Creating the User type
type User = {
	id: string;
	name: string;
	avatar: string;
}

// Creating the context type
type AuthContextType = {
	user: User | undefined; // user can be undefined because at the first access there is no user
	signInWithGoogle: () => Promise<void>; // All async functions returns a Promise
}

type AuthContextProviderProps = {
    children: ReactNode;
}

// Creating a context for auth as an object of the type created
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    // Creating a state of User type
	const [user, setUser] = useState<User>();

	// Calls a function when something happens
	// In this case, calls a function when nothing happens (calls one time only)
	useEffect(() => {

		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error('Faltam informações sobre sua Conta do Google.');
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				})
			}
		})

		// Unregister the listener
		return () => {
			unsubscribe();
		}
	}, [])

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
        
        // Shows the Google SignIn popup
        const result = await auth.signInWithPopup(provider);
		
		if (result.user) {
			const { displayName, photoURL, uid } = result.user;

			if (!displayName || !photoURL) {
				throw new Error('Faltam informações sobre sua Conta do Google.');
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL
			})
		}
	}

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}