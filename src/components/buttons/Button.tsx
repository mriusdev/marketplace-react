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
  // debugger
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
  // if (!props.buttonType) {
  //   return styles.button__primary;
  // }

  if (props.secondary) {
    return styles.button__secondary;
  }

  return styles.button__primary;
 
  // switch (props) {
  //   case props.primary:
  //     return styles.button__primary;
  //   case ButtonTypes.Secondary:
  //     return styles.button__secondary;
  //   default:
  //     return styles.button__primary;
  // }
}

export { Button };
