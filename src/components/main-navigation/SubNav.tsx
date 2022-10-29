import React from 'react'

import styles from './main-navigation.module.scss'

type Props = {}

export const SubNav = (props: Props) => {
  return (
    <div className={styles.sub_nav__actions}>
      <span className={styles.text_sm}>Login / Regiser</span>
      <div className={styles.sub_nav__options}>
        <div className={styles.sub_nav__buttons} id={styles.sub_nav__profile_container}>
          <span id={styles.sub_nav__profile} className="material-icons-outlined">person</span>
          <div className={styles.sub_nav__buttons_tooltip_nav}>
            <div>
              Profile
            </div>
            <div>
              Listings
            </div>
          </div>
        </div>
        <div className={styles.sub_nav__buttons}>
          <span className="material-icons-outlined">add_box</span>
        </div>
      </div>
    </div>
  )
}