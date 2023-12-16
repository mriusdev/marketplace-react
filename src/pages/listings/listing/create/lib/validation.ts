import { FormikErrors } from "formik";
import { IFormErrorsValidationObject, IInitialListingTextData } from "../CreateListing";
import { VALIDATION_MESSAGES } from "../../../../../helper/form";

export function validate(values: IInitialListingTextData): FormikErrors<IFormErrorsValidationObject>
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
  if (!values.category) {
    errors.category = VALIDATION_MESSAGES.REQUIRED
  }

  return errors;
}
