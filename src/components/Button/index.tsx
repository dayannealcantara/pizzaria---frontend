
import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?:boolean
  children:ReactNode
}

export default function Button({loading, children, ...rest}: ButtonProps) {
  return (   
   <button className={styles.btn} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner/>
      ) : (
        <a className={styles.btnTitle}>{children}</a>
      )
      }
    </button>
  )
}
