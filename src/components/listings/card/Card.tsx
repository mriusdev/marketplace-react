import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom';
import { publicS3Url } from '../../../helper/awsLinkFormatter';
import { IListingImages } from '../../../interfaces';

import styles from './card.module.scss';

type Props = {
  price: string
  title: string
  description?: string
  listingImages: IListingImages[]
}

export const Card = ({price, title, description, listingImages}: Props) => {
  return (
    <div className={styles.card__container}>
      <div className={styles.image__wrapper}>
        <img src={ listingImages[0]?.imageLocation ? publicS3Url(listingImages[0].imageLocation) : "https://source.unsplash.com/random/50×50/?computer"} alt="" />
      </div>
      <span className={styles.card__price}>${price}</span>
      <span className={styles.card__title}>{title}</span>
      <span className={styles.card__description}>{description}</span>
    </div>
  )
}
