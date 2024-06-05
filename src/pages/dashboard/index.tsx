import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';


import { FiRefreshCcw } from 'react-icons/fi'
import { Header } from '../../components/Header/indes';
import { setupAPIClient } from '../../services/api';
import { useState } from 'react';
import Modal from 'react-modal';
import { ModalOrder } from '../../components/ModalOrder';

type ItemProps = {
  id: string
  name: string
  table: string | number
  status: boolean
  draft: boolean  
}

interface OrdersProps{
  orderList: ItemProps []
}

export type OrderItemProps = {
  id:string
  amount:number
  order_id:string
  product:{
    id: string
    name: string
    description:string
    price:string
    banner:string
  }
  order:{
    id: string
    name: string | null
    table: string | number
    status: boolean    
  }
}

export default function Dashboard({ orderList}: OrdersProps){

  const [orders, setOrders] = useState(orderList || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [openModal, setOpenModal] = useState(false)

function handleCloseModal(){
  setOpenModal(false)
}

  async function handleModalView (id:string) {
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/order/detail', {
      params:{
        order_id:id
      }
    })
    setModalItem(response.data)
    setOpenModal(true)
  }

  async function handleFinishOrder(id:string){
    const apiClient = setupAPIClient();
    await apiClient.put('/order/finish', {
      order_id:id
    })
    const response = await apiClient.get('/orders')
    setOrders(response.data)
    setOpenModal(false)
  }

  async function handleRefreshOrders(){
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/orders')
    setOrders(response.data)
  }
  Modal.setAppElement('#__next')

  return(
    <>
    <Head>
      <title>Painel - Sujeito Pizzaria</title>
    </Head>
    <div>
      <Header/>
    
      <main className={styles.container}>

        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefreshOrders}>
            <FiRefreshCcw size={25} color="#3fffa3"/>
          </button>
        </div>

        <article className={styles.listOreders}>

        {orders.length === 0 &&  <span className={styles.emptyList}>Nenhum pedido aberto...</span> }
        {orders.map(item => (                
            <section className={styles.orderItem}  key={item.id}> 
              <button onClick={() => handleModalView(item.id)}>
                <div className={styles.tag}></div>              
                <span>Mesa {item.table}</span>
              </button>
            </section>                   
        ))}  
         </article>  
      </main>

      { openModal && (
        <ModalOrder
          isOpen={openModal}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={handleFinishOrder}
        />
      )}
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/orders')

  return {
   props:{
      orderList: response.data
    }
  }
})