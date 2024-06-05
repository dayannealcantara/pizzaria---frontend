import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';


import { FiRefreshCcw } from 'react-icons/fi'
import { Header } from '../../components/Header/indes';
import { setupAPIClient } from '../../services/api';
import { useState } from 'react';

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

export default function Dashboard({ orderList}: OrdersProps){

  const [orders, setOrders] = useState(orderList || [])

  function handleModalView (id:string) {
    alert('TESTE')
  }

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
          <button>
            <FiRefreshCcw size={25} color="#3fffa3"/>
          </button>
        </div>

        <article className={styles.listOreders}>
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