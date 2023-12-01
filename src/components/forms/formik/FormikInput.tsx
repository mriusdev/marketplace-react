import { ICustomInputProps, Input } from "../input/Input";
import { FieldProps } from "formik";

// interface IFormikInputProps extends ICustomInputProps {
//   field: FieldInputProps<'input'>
//   form: FormikBag
//   meta: FieldMetaProps<'input'>
// }

export function FormikInput({field, form: {errors}, ...props}: ICustomInputProps & FieldProps) {
  // console.log('getting props from field', props);
  
  return (
    <Input {...field} {...props} validationmessage={errors[field.name]} />
  )
}
