"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import Router from "next/router";

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token') 
    }catch(err){
        console.log('erro ao deslogar', err)
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;  
    const router = useRouter();

    useEffect(() => {
        const {'@nexauth.token': token} = parseCookies();
        if(token){
            api.get('/me').then(response => {
                const { id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                signOut()
            })
        }
    })

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email,
                password
            })

            const {id, name, token} = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({
                id,
                name,
                email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            router.push('/dashboard')
            
        }catch(err){
            toast.error("Erro ao acessar.")
            console.log('deu erroo', err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Conta criada com sucesso!")

            router.push('/')

        }catch(err){
            toast.error("Erro ao cadastrar.")
            console.log('deu errooo', err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}