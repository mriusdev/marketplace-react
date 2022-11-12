import React from 'react'
import styles from './self-profile.module.scss'
import { useParams } from 'react-router-dom'

type Props = {}

export const SelfProfile = (props: Props) => {
  const { username } = useParams();
  return (
    <div>
      <h1>Hello, {username} </h1>
      <h2>Name</h2>
      <h3>Email</h3>
    </div>
  )
}
