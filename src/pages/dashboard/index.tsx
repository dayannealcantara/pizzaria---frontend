import  Head  from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";


export default function Dashboard() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Dashboard</title>
      </Head>        
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props:{}
  }
})