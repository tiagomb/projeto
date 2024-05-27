import { Metadata } from 'next';
import SignUpProvider from '@/providers/SignUpProvider';

export const metadata: Metadata = {
  title: 'SujeitoPizza - Faça seu cadastro'
}

export default function SignUp() {
  return (
    <>
    <SignUpProvider/>
    </>
  )
}

