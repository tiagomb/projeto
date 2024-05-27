"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import checkToken from '@/utils/token';
import { Header } from '@/components/Header';
import styles from '@/app/product/styles.module.scss'
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';


export default function ProductProvider(){
    const router = useRouter();
    const [avatarURL, setAvatarURL] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    async function fetchData(){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/category');
        setCategories(response.data)
    }

    useEffect(() => {
        const token = checkToken();
        if (!token){
            router.push('/');
        }
        fetchData();
    },[])

    function handleFile(e: ChangeEvent<HTMLInputElement> ){
        if (!e.target.files){
            return;
        }

        const image = e.target.files[0];
        if (!image){
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jfif'){
            setImageAvatar(image);
            setAvatarURL(URL.createObjectURL(image))
        }
    }

    function handleChange(event){
        setCategory(event.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault()
        try{
            const data = new FormData();
            if (name === '' || price === '' || description === '' || imageAvatar === null ){
                toast.error("Preencha os campos!")
                return;
            }
            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[category].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success("Produto cadastrado com sucesso!")
        }catch(err){
            console.log(err)
            toast.error("Erro ao cadastrar :(")
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarURL('')
    }

    return(
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Novo produto</h1>
                <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>
                        <span>
                           <FiUpload size={30} color='#FFF'/> 
                        </span>

                        <input type="file" accept='image/png, image/jpeg, image/jfif' onChange={handleFile}/>

                        {avatarURL && (
                            <img 
                                className={styles.preview}
                                src={avatarURL}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                            />
                        )}
                    </label>

                    <select value={category} onChange={handleChange}>
                        {categories.map((item, index) => {
                            return(
                                <option key={item.id} value={index}>{item.name}</option>
                            )
                        })}
                    </select>

                    <input 
                    type="text" 
                    placeholder='Digite o nome do produto'
                    className={styles.input}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    />

                    <input 
                    type="text" 
                    placeholder='Preço do produto'
                    className={styles.input}
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    />

                    <textarea
                    placeholder='Descreva seu produto'
                    className={styles.input}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    />

                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
    )
}