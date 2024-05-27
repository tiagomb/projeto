"use client";

import { useState, FormEvent, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";

import checkToken from '@/utils/token';

import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import styles from '../app/page.module.scss'
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

import Link from 'next/link';

export default function SignUpProvider() {
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const token = checkToken();
    if (token){
      router.push('/dashboard');
    }
  },[])

  async function handleSignUp(event: FormEvent){
    event.preventDefault()

    if (name === '' || email === '' || password === ''){
      toast.warn("Preencha os campos")
      return;
    }

    setLoading(true);

    let data = {
        name,
        email,
        password
    }

    await signUp(data);

    setLoading(false);

  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>
      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit={handleSignUp}>
          <Input 
            placeholder='Digite seu nome' 
            type='text'
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
          <Input 
            placeholder='Digite seu email' 
            type='text'
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <Input 
            placeholder='Digite sua senha' 
            type='password'
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />

          <Button type='submit' loading={loading}>
            Cadastrar
          </Button>
        </form>

        <Link href={'/'} className={styles.text}>
          Já possui uma conta? Faca login!
        </Link>
    
      </div>
    </div>
  );
}
