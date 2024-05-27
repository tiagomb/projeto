import { Metadata } from "next";
import CategoryProvider from "@/providers/CategoryProvider";

export const metadata: Metadata = {
    title: 'Nova categoria - Sujeito Pizzaria'
}

export default function Category(){
    return(
        <>
        <CategoryProvider/>
        </>
    )
}