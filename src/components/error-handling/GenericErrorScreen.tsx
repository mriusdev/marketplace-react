import React from 'react'

type Props = {
  errorMsg?: string
}

const GENERIC_ERROR_MESSAGE = 'Oops something went wrong...'

export const GenericErrorScreen = ({errorMsg = GENERIC_ERROR_MESSAGE}: Props) => {
  return (
    <div>
      <h1>
        {errorMsg}
      </h1>
      <h3>
        Please try again later.
      </h3>

    </div>
  )
}
