import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ISignupData } from '../../interfaces/categories'
import styles from './sign-up.module.scss'
import { registerUser } from '../../api/auth/registerAPI'

type Props = {}

export const SignUp = (props: Props) => {
  const [formData, setFormData] = useState<ISignupData>({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<any>(undefined)
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData)
      console.log(data);
    } catch (error: any) {
      setErrors(error.response.data)
    }
  }
  const setData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className={styles.register__container}>
    <form onSubmit={onSubmit} className={styles.form__container}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id='username'
        onChange={setData}
      />
      <label htmlFor="email">Email</label>
      <input type="email" name="" id="email" onChange={setData} />
      <label htmlFor="password">Password</label>
      <input type="password" name="" id="password" onChange={setData}/>
      <button className={styles.submit_btn} >Sign Up</button>
    </form>

    {errors && (
      <div className={styles.error__container}>
        <h3 className={styles.error__text}>{errors.error}</h3>
        {errors.message.map((message: string, index: number) => <>
          <span key={index} className={styles.error__message}>{message}</span>
          <br />
        </>)}
      </div>
    )}
    
  </div>
  )
}
