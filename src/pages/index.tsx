import  Head  from "next/head";
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import Image from "next/image";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";


export default function Home() {
const {signIn} = useContext(AuthContext)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)

async function handleLogin(event: FormEvent){
  event.preventDefault()

  if(email === '' || password === '') {
    alert('dados')
    return;
  }

  let data ={
    email,
    password
  }
   await signIn(data)
}

  return (
    <>
      <Head>
        <title>SujeitoPizza - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo da pizzaria" width={476} height={106}/>
        <div className={styles.formContainer}>
          <form onSubmit={handleLogin}>
          <Input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input  type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={false}>Acessar</Button>
          </form>
          <Link href='/signup' className={styles.text}> Não possui uma conta?Cadastre-se</Link>
        </div> 
      </div>
    </>
  )
}
