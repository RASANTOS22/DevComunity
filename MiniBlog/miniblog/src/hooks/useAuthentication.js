import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react'

//Cadastro
export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)


    //cleanup
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()

    function checkCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;

        } catch (error) {

            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha deve conter pelo menos 6 caracteres.";
            } else if (error.message.includes("Email já usado")) {
                systemErrorMessage = "E-mail já ultilizado.";
            } else {
                systemErrorMessage = "Ocorreu um erro no sistema, por favor tente mais tarde";
            }



            setLoading(false);
            setError(systemErrorMessage);
        }
    };


    //logout
    const logout = () => {
        checkCancelled();

        signOut(auth);
    };


    //Login
    const login = async (data) => {
        checkCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("user-not-foud")) {
                systemErrorMessage = "Usuário não existe!"
            } else if (error.message.includes("wrong-password")){
                systemErrorMessage = "Senha Incorreta!"
        } else {
            systemErrorMessage = "Ocorreu um erro inesperado."
        }
        setError(systemErrorMessage)
        setLoading(false);


    }

}


useEffect(() => {
    return () => setCancelled(true);
}, []);


return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,

    };


};
