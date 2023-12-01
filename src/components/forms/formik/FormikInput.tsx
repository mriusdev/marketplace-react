import { ICustomInputProps, Input } from "../input/Input";
import { FieldProps } from "formik";

export function FormikInput({field, form: {errors}, ...props}: ICustomInputProps & FieldProps) {
  return (
    <Input {...field} {...props} validationmessage={errors[field.name]} />
  )
}
