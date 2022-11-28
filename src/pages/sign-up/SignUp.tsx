import React, { ChangeEvent, FormEvent, useState, useContext } from 'react'
import { ISignupData } from '../../interfaces'
import styles from './sign-up.module.scss'
import useRegister from '../../query-hooks/auth/useRegister'
import AuthService from '../../auth/AuthService'
import { AxiosError } from 'axios'

type Props = {}

export const SignUp = (props: Props) => {
  const [formData, setFormData] = useState<ISignupData>({
    username: '',
    email: '',
    password: ''
  })
  const { mutateAsync, isLoading, error } = useRegister();

  const [errors, setErrors] = useState<any>(undefined)
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(formData)
      console.log('data that we get', data);
      
    } catch (error: AxiosError | any) {
      setErrors(error?.response?.data)
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
      <h3 className={styles.form__title}>Create an account</h3>
      <div className={styles.register__main__content}>
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
          <button className={styles.submit_btn}>Create account</button>
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
    </div>
  )
}
