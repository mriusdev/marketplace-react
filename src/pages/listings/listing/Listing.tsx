import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export const Listing = (props: Props) => {
  const { id } = useParams();
  return (
    <div>
      <h1>Listing {id}</h1>
      <h2>price</h2>
      <h3>description</h3>
    </div>
  )
}