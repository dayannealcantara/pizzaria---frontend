import  Head  from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header/indes";


export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Sujeito pizzaria</title>
      </Head>
      <div>
        <Header/>
      </div>        
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props:{}
  }
})