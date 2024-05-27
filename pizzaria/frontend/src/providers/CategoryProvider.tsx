"use client";

import { Header } from "@/components/Header";
import styles from '@/app/category/styles.module.scss'
import { useState, FormEvent, useEffect } from "react";
import checkToken from "@/utils/token";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CategoryProvider(){
    const [name, setName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = checkToken();
        if (!token){
            router.push('/');
        }
    },[])

    async function handleRegister(event: FormEvent) {
        event.preventDefault()
        if (name === ''){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso!')
        setName('')
    }

    return(
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                        type="text"
                        placeholder="Digite o nome da categoria"
                        className={styles.input}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <button type="submit" className={styles.buttonAdd}>
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
    )
}