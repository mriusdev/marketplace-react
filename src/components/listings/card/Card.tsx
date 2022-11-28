import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom';

import styles from './card.module.scss';

type Props = {
  price: string
  title: string
  description?: string
}

export const Card = ({price, title, description}: Props) => {

  return (
    <div className={styles.card__container}>
      <div className={styles.image__wrapper}>
        <img src="https://source.unsplash.com/random/50×50/?shirt" alt="" />
      </div>
      <span className={styles.card__price}>${price}</span>
      <span className={styles.card__title}>{title}</span>
      <span className={styles.card__description}>{description}</span>
    </div>
  )
}