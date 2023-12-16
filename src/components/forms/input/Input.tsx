import React from 'react';

import styles from '../forms.module.scss';
import { Button } from '../../buttons/Button';

export interface ICustomInputProps extends React.ComponentPropsWithRef<'input'> {
  validationmessage?: any
}

function getClassName(): string
{
  return styles.forms_input
}

const Input = React.forwardRef<
  HTMLInputElement, ICustomInputProps
>(({...props}, ref) => {
  // const propsCopy = {
  //   ...props
  // }
  // props = propsCopy
  if (props.className === undefined) {
    delete props.className;
  }

  if (props.type === 'file') {
    return (
      <div className={styles.forms_input_container}>
        <Button disabled={props.disabled}>
          Select files
        </Button>
        <input 
          {...props}
          className={styles.forms_input_file}
          ref={ref}
        />
      </div>
    )
  }

  return <>
    <input
      ref={ref}
      className={styles.forms_input}
      {...props}
    />
    {(props.validationmessage && typeof props.validationmessage === 'string') &&
      <span className={styles.forms_validation_message}>
        {props.validationmessage}
      </span>
    }
  </>
})

export { Input };
