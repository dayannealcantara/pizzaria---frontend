import  Head  from "next/head";
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import Image from "next/image";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";


export default function SignUp() {
  const { signUp} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

 async function handleSignUp (event : FormEvent){
    if (name=== '' || email === '' || password === ''){
      toast.warning("Preencha todos os campos")
      return;
    }
    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)

  }
  

  return (
    <>
      <Head>
        <title>SujeitoPizza - Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo da pizzaria" width={476} height={106}/>
        <div className={styles.formContainer}>
          <form onSubmit={handleSignUp} >
          <Input type="text" placeholder="Nome da empresa" value={name} onChange={(e) => setName(e.target.value)}/>
          <Input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input  type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={loading}>Cadastrar</Button>
          </form>          
          <Link href="/" className={styles.text}> Já possuo uma conta? Faça login!</Link>
        </div> 
      </div>
    </>
  )
}
