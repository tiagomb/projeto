import ThemeProvider from "../providers/ThemeProvider";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'SujeitoPizza - Faça seu login'
}

export default function Home() {

  return (
    <ThemeProvider/>
  );
}