import React from "react";
import { Dropdown } from "./Dropdown";
import { IDropdownProps } from "./Dropdown";
import { useField, useFormikContext } from "formik";

interface IFormikDropdownProps extends IDropdownProps{
  name: keyof IFormErrorsValidationObject
}

interface IFormErrorsValidationObject {
  title: string
  description: string
  price: string
  category: string
}

export function FormikDropdown(props: IFormikDropdownProps) {
  // const fieldName: keyof IFormErrorsValidationObject = props.name;
  const [field] = useField(props.name);
  const { setFieldValue, errors } = useFormikContext<IFormErrorsValidationObject>();
  console.log('current dropdown errors', errors);
  
  // console.log('formik dropdowm errors', errors);

  function getValidationMessage(): string {
    // console.log('field is ', field);
    
    // if (typeof field.name !== 'string') {
    //   return '';
    // }

    // if (errors !== undefined) {
    //   errors[props.name]
    // }

    // if (!errors[field.name]) {
    //   return;
    // }

    if (props.name === undefined) {
      return ''
    }

    return errors ? (errors[props.name] ?? '') : ''

    // if (props.name !== undefined) {
    //   return errors[props.name]
    // }

    // return errors[props.name];
    // return 'error';
  }

  const validationMessageFromFn: string = getValidationMessage();
  // console.log('validation message from fn', validationMessageFromFn);
  
  

  const handleChange = (value: any) => {
    if (typeof field.name !== 'string') {
      return;
    }
    setFieldValue(field.name, value);
  }
  return (
    <Dropdown
      {...props}
      setValue={handleChange}
      validationMessage={validationMessageFromFn}
    />
  )
}
