import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export default function Input({...rest}:InputProps) {
  return (   
    <input  className={styles.input} {...rest}/>     
  )
}
