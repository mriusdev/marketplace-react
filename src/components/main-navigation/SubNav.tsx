import { Link } from 'react-router-dom'
import AuthService from '../../auth/AuthService'

import styles from './main-navigation.module.scss'

type Props = {}

export const SubNav = (props: Props) => {
  return (
    <div className={styles.sub_nav__actions}>
      {
        !AuthService.isLoggedIn() &&
        <span className={styles.text_sm}>Login / Regiser</span>
      }
      <div className={styles.sub_nav__options}>
        {
          AuthService.isLoggedIn() &&
          <div className={styles.sub_nav__buttons} id={styles.sub_nav__profile_container}>
            <span id={styles.sub_nav__profile} className="material-icons-outlined">person</span>
            <div className={styles.sub_nav__buttons_tooltip_nav}>
              <div>
                <Link to={'users/andrius.m'}>Profile</Link>
              </div>
              <div>
                Listings
              </div>
              <div>
                Log out
              </div>
            </div>
          </div>
        }
        
        <div className={styles.sub_nav__buttons}>
          <Link to={'create/listing'}>
            <span className="material-icons-outlined">add_box</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
