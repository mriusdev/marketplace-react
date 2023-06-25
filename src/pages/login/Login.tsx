import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from 'react-router-dom'
import useLogin from '../../query-hooks/auth/useLogin'
import styles from './login.module.scss'
import AuthService from '../../auth/AuthService'
import { AxiosError } from 'axios'

type Props = {}

interface ILoginData {
  email: string
  password: string
}

export const Login = (props: Props) => {
  const [formData, setFormData] = useState<ILoginData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<any>(undefined)
  const { mutateAsync, isLoading, error } = useLogin();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const data = await mutateAsync(formData)
      console.log('data that we get', data);
      AuthService.addAuthDetailsToLocalStorage(data?.access_token)
    } catch (error: AxiosError | any) {
      setErrors(error?.response?.data)
    }
    console.log('finished');
    
  }

  const setData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  return (
    <div className={styles.login__container}>
      <form className={styles.form__container} onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" value={formData.email} onChange={setData}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="" id="password" value={formData.password} onChange={setData} />
        <button className={styles.submit_btn}>Sign In</button>
      </form>

      {errors && (
        <div className={styles.error__container}>
          <h3 className={styles.error__text}>{errors.error}</h3>
          {errors.message.map((message: string, index: number) => (
            <>
              <span key={index} className={styles.error__message}>{message}</span>
              <br />
            </>
          ))}
        </div>
      )}
      
    </div>
  )
}
