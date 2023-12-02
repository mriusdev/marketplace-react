import React from "react";
import { Dropdown } from "./Dropdown";
import { IDropdownProps } from "./Dropdown";
import { useFormikContext, FieldProps } from "formik";

interface IFormikDropdownProps extends IDropdownProps {
  name: string
}

export function FormikDropdown({field, form: {errors}, ...props}: IFormikDropdownProps & FieldProps) {
  const { setFieldValue } = useFormikContext();
  
  function getValidationMessage(): string
  {
    if (!errors || typeof errors[field.name] !== 'string') {
      return ''
    }

    return errors[field.name] as string; 
  }

  const validationMessage: string = getValidationMessage();

  const handleChange = (value: any): void => {
    if (typeof field.name !== 'string') {
      return;
    }
    setFieldValue(field.name, value);
  }

  return (
    <Dropdown
      {...props}
      setValue={handleChange}
      validationMessage={validationMessage}
    />
  )
}
