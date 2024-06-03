import  Head  from "next/head";
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import Image from "next/image";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";


export default function Dashboard() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Dashboard</title>
      </Head>    
      <div className={styles.containerCenter}>
         <h1>Dashboard</h1>
        <Image src={logoImg} alt="logo da pizzaria" width={476} height={106}/>
        <div className={styles.formContainer}>
          <form action="" >
          <Input type="text" placeholder="Nome da empresa"/>
          <Input type="text" placeholder="Digite seu email"/>
          <Input  type="password" placeholder="Sua senha"/>
          <Button type="submit" loading={false}>Cadastrar</Button>
          </form>          
          <Link href="/" className={styles.text}> Já possuo uma conta? Faça login!</Link>
        </div> 
      </div>
    </>
  )
}
