import { AxiosError } from "axios";

export function isObjectEmpty(object: Object): boolean
{
  return Object.values(object).length === 0
}

export function parseErrorMessage(error: any): string | null
{
  if (!(error instanceof AxiosError)) {
    return null
  }
  return error?.response?.data?.message
}
