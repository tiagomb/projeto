"use client";

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import checkToken from "@/utils/token";
import styles from '@/app/dashboard/styles.module.scss'

import { Header } from "@/components/Header";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "@/services/api";
import Modal from 'react-modal'
import { ModalOrder } from "@/components/ModalOrder";

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order:{
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function DashboardProvider(){
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModal(id: string ){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/order/detail', {
            params:{
                order_id: id
            }
        })

        setModalItem(response.data)
        setModalVisible(true)
    }

    async function handleFinishItem(id: string){
        const apiClient = setupAPIClient()
        await apiClient.put('/order/finish', {
            order_id: id
        })

        const response = await apiClient.get('/orders');
    
        setOrders(response.data)
        setModalVisible(false);
    }

    async function fetchData(){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/orders')
        setOrders(response.data)
    }

    useEffect(() => {
        const token = checkToken();
        if (!token){
            router.push('/');
        }
        fetchData();
    },[])


    Modal.setAppElement('#next')

    return (
        <div>
            <Header/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={fetchData}>
                        <FiRefreshCcw size={25} color="#3fffa3"/>
                    </button>
                </div>

                <article className={styles.listOrders}>

                    {orders.length === 0 && (
                        <span className={styles.emptyList}>
                            Nenhum pedido aberto
                        </span>
                    )}

                    {orders.map(item => (
                        <section key={item.id} className={styles.orderItem}>
                        <button onClick={() => handleOpenModal(item.id)}>
                            <div className={styles.tag}></div>
                            <span>Mesa {item.table}</span>
                        </button>
                    </section>
                    ))}

                </article>
            </main>

            { modalVisible && (
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    handleFinishOrder={handleFinishItem}
                />
            )}

        </div>
    )
}