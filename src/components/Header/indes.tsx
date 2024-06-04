
import Link from "next/link";
import {FiLogOut} from 'react-icons/fi'
import styles from './styles.module.scss'
import Image from "next/image";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";


export function Header() {

  const {signOut} = useContext(AuthContext)


  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}> 
      <Link href="/">
        <Image src="/logo.svg" alt="logo da pizzaria" width={190} height={60} />      
      </Link>

      <nav className={styles.menuNav}>
        <Link href='/category'>Categoria</Link>
        <Link href='/product'>Cardápio</Link>
        <button onClick={signOut}>
        <FiLogOut color='#fff' size={24}/>
      </button>
      </nav>
      </div>    
    </header>
  )
}