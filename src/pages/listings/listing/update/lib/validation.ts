import { FormikErrors } from "formik";
import { IFormErrorsValidationObject, IListingUpdateText } from "../ListingUpdate";
import { VALIDATION_MESSAGES } from "../../../../../helper/form";

export function validate(values: IListingUpdateText, originalFields: IListingUpdateText): FormikErrors<IFormErrorsValidationObject>
{
  const errors: FormikErrors<IFormErrorsValidationObject> = {};

  if (!values.title) {
    errors.title = VALIDATION_MESSAGES.REQUIRED
  }
  if (!values.description) {
    errors.description = VALIDATION_MESSAGES.REQUIRED
  }
  if (!values.price) {
    errors.price = `${VALIDATION_MESSAGES.REQUIRED} and cannot be 0`
  }
  // if (values.title === originalFields.title) {
  //   errors.title = VALIDATION_MESSAGES.NO_SAME_CONTENT
  // }
  // if (values.description === originalFields.description) {
  //   errors.description = VALIDATION_MESSAGES.NO_SAME_CONTENT
  // }
  // if (values.price === originalFields.price) {
  //   errors.price = VALIDATION_MESSAGES.NO_SAME_CONTENT
  // }

  return errors;
}
