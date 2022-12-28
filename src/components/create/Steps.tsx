import React, { Fragment, ReactNode } from 'react'
import { HorizontalDivider } from '../misc/HorizontalDivider'

import styles from './steps.module.scss'

interface IProps {
  children?: ReactNode
  steps: string[]
  currentStepIndex: number
}

export const Steps = ({children, steps, currentStepIndex}: IProps) => {
  console.log('steps array length', steps.length);
  console.log('current step', currentStepIndex);
  
  
  const areRemainingSteps = (steps: string[], index: number ): boolean => {
    let stepsLength = steps.length
    if (index < --stepsLength) {
      return true
    }
    return false
  }

  const currentStepReadableFormat = (index: number): number => {
    let indexCopy = index
    return ++indexCopy
  }
  return (
    <div className={styles.steps__container}>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <div className={
                index <= currentStepIndex ? `${styles.steps__step} ${styles.active}` : `${styles.steps__step} ${styles.inactive}`
              }
            >
              <span>{currentStepReadableFormat(index)}</span>
            </div>
            {areRemainingSteps(steps, index) && (
              <HorizontalDivider />
            )}
          </Fragment>
        ))}
        {/* <div className={`${styles.steps__step} ${styles.active}`}>
          <span>1</span>
        </div>
        <HorizontalDivider />
        <div className={`${styles.steps__step} ${styles.inactive}`}>
          <span>2</span>
        </div>
        <HorizontalDivider />
        <div className={`${styles.steps__step} ${styles.inactive}`}>
          <span>3</span>
        </div>
        <HorizontalDivider />
        <div className={`${styles.steps__step} ${styles.inactive}`}>
          <span>4</span>
        </div> */}
      </div>
      {children}
      <div className={styles.steps__navigation}>
        <button className={styles.steps__button}>Back</button>
        <button className={styles.steps__button}>Next</button>
      </div>
    </div>
  )
}
