import { TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function TextArea({...rest}:TextAreaProps ) {
  return (   
    <textarea className={styles.textarea} {...rest}></textarea>     
  )
}
