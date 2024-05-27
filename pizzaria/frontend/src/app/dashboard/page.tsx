import DashboardProvider from "@/providers/DashboardProvider"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Painel - Sujeito Pizzaria'
  }

export default function Dashboard(){
    return (
        <>
        <DashboardProvider/>
        </>
    )
}