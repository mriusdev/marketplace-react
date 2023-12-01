import React from 'react';

import styles from './button.module.scss';

enum ButtonTypes {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  secondary?: boolean
}

const Button = React.forwardRef<
  HTMLButtonElement, ButtonProps
>(({...props}, ref) => {
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
