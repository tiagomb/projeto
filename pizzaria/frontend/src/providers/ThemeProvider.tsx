"use client";

import { useContext, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";
import checkToken from '@/utils/token';

import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import styles from '../app/page.module.scss'
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

export default function ThemeProvider() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = checkToken();
    if (token){
      router.push('/dashboard');
    }
  },[])

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    if (email === '' || password === ''){
      toast.warn("Preencha os campos")
      return;
    }

    setLoading(true)

    let data = {
        email,
        password
    }
    await signIn(data)

    setLoading(false)
  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" priority={true}/>
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input 
            placeholder='Digite seu email' 
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder='Digite sua senha' 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type='submit' loading={loading}>
            Acessar
          </Button>
        </form>

        <Link href={'/signup'} className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
    
      </div>
    </div>
  );
}