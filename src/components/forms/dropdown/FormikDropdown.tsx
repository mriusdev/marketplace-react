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
  const [field] = useField(props.name);
  const { setFieldValue, errors } = useFormikContext<IFormErrorsValidationObject>();
  console.log('current dropdown errors', errors);
  

  function getValidationMessage(): string {
    if (props.name === undefined) {
      return ''
    }

    return errors ? (errors[props.name] ?? '') : ''
  }

  const validationMessageFromFn: string = getValidationMessage();

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
