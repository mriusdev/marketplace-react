import { FormikTouched } from "formik";
import { Slide, toast } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";

const toastId = "general";

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Required'
}

interface IToastOptions {
  options?: "loading" | "error" | "success"
  message?: string
  dismiss?: boolean
}

export function setToast(options: IToastOptions): void
{
  const defaultOptions: ToastOptions = {
    toastId: toastId,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    position: toast.POSITION.TOP_RIGHT,
    transition: Slide
  }

  if (options.dismiss) {
    toast.dismiss(defaultOptions.toastId)
  }

  if (options.options === 'loading') {
    console.log('setting loading state');

    // toast.loading('Loading', defaultOptions)

    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        ...defaultOptions,
        render: options.message,
        isLoading: true
      })
    } else {
      toast.loading('Loading', defaultOptions)
    }
  }

  if (options.options === 'error') {
    console.log('setting error state');
    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        ...defaultOptions,
        render: options.message,
        type: "error",
        isLoading: false
      })
      console.log('updated toast');
      
    } else {
      toast.error(options.message, defaultOptions)
      console.log('spawned new erro toast');

    }
  }

  if (options.options === 'success') {
    console.log('setting success state');
    // toast.update(toastId, {
    //   ...defaultOptions,
    //   render: options.message,
    //   type: "success",
    //   isLoading: false
    // })

    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        ...defaultOptions,
        render: options.message,
        type: "success",
        isLoading: false
      })
    } else {
      toast.success(options.message, defaultOptions)
    }
  }
}

/**
 * Generic type T expects an error object of the possible error keys and string types
 */
export class CustomFormikHelpers<T>
{
  constructor() {}

  isAnyTouched(touched: FormikTouched<T>): boolean
  {
    if (JSON.stringify(touched) === '{}') {
      return false;
    }
    return true;
  }
}
