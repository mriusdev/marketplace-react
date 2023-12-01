import React from 'react';

import styles from '../forms.module.scss';

export interface ICustomInputProps extends React.ComponentPropsWithRef<'input'> {
  validationmessage?: any 
}

// function rule(value: any): boolean|string
// {
//   return !!value || 'Field is required';
// }

function getClassName(): string
{
  return styles.forms_input
}

const Input = React.forwardRef<
  HTMLInputElement, ICustomInputProps
>(({...props}, ref) => {
  // console.log('getting props in custom input', props);
  if (props.className === undefined) {
    delete props.className;
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
