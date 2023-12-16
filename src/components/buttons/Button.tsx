import React from 'react';

import styles from './button.module.scss';
import Spinner from '../forms/loader/Spinner';

enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  secondary?: boolean
  loading?: boolean
}

const Button = React.forwardRef<
  HTMLButtonElement, ButtonProps
>(({...props}, ref) => {
  // if (props.loading) {
    return (
      <button
        ref={ref}
        className={getClassName(props)}
        {...props}
      >
        {props.children}
        {props.loading && <Spinner />}
      </button>
    )
  // }

  return (
    <button
      ref={ref}
      className={getClassName(props)}
      {...props}
    />
  )
})

function getClassName(props: ButtonProps): string
{
  if (props.secondary) {
    return styles.button__secondary;
  }

  return styles.button__primary;
}

export { Button };
