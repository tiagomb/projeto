import { Metadata } from "next"
import ProductProvider from "@/providers/ProductProvider"

export const metadata: Metadata = {
    title: 'Novo produto - Sujeito Pizzaria'
}


export default async function Product(){
    return(
        <>
        <ProductProvider/>
        </>
    )
}