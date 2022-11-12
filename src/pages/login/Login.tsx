import React from 'react'
import { Form } from 'react-router-dom'
import styles from './login.module.scss'

type Props = {}

export const Login = (props: Props) => {
  return (
    <div className={styles.login__container}>
      <form className={styles.form__container}>
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="" id="" />
        <button className={styles.submit_btn} type='button'>Sign In</button>
      </form>

      <div className={styles.error__container}>
        <span className={styles.error__text}>errors</span>
      </div>
    </div>
  )
}
