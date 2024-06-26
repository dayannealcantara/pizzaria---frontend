import Head from "next/head"
import { Header } from "../../components/Header/indes"
import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from 'react-icons/fi'
import Image from "next/image";

type ItemProps = {
  id: string
  name: string
}

interface CategoryProps{
  categoryList: ItemProps[]
}

export default function Product({categoryList}: CategoryProps){
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] =useState(0)

  async function handleRegister(event: FormEvent){
    event.preventDefault();
    
    try{
      const data = new FormData();

      if(name == '' || value === ''|| description === '' || imageAvatar === null){
        toast.error("Preencha todos os campos!")
        return
      }

      data.append('name', name)
      data.append('price', value)
      data.append('description', description)
      data.append('category_id', categories[categorySelected].id)
      data.append('file', imageAvatar)

      const apiClient = setupAPIClient();
      await apiClient.post('/product', data)
      toast.success('Produto cadastrado com sucesso!')
      setName('')
      setCategories(categories)
      setValue('')
      setDescription('')
      setImageAvatar(null)
      setAvatarUrl('')

    }catch(err){
      console.log(err)
      toast.error('Ops erro ao cadastrar!')
    }  
  }


  function handleFile(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      return;
    }
    const image = e.target.files[0];
    if(!image){
      return;
    }
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

 function handleChangeCategory(event) {
    setCategorySelected(event.target.value)
  }
  return(
    <>
    <Head>
      <title>Nova Produto - Sujeito Pizzaria</title>
    </Head>
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Novo Produto</h1>

        <form className={styles.form} onSubmit={handleRegister}>

        <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>

              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

              {avatarUrl && (     
                  <Image
                    className={styles.preview}
                    src={avatarUrl}
                    alt="Foto do produto" 
                    width={250}
                    height={250}
                  />
              )}
            </label>

          <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option  key={item.id}value={index}>{item.name}</option>
                )
              })}
          </select>

          <input 
          type="text" 
          placeholder="Nome do item"
          className={styles.input}
          value={name}
          onChange={ (e) => setName(e.target.value) }
          />
          <input 
          type="text" 
          placeholder="Valor"
          className={styles.input}
          value={value}
          onChange={ (e) => setValue(e.target.value) }
          />
          <textarea 
            placeholder="Descreva seu produto..."   
            className={styles.input}
            value={description}
            onChange={ (e) => setDescription(e.target.value) }
            />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>

        </form>

      </main>
    </div>
    </>
  )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/category')

  return {
   props:{
      categoryList: response.data
    }
  }
})