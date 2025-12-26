
import Header from '@/composnents/Header/header'
import React, { Fragment } from 'react'

const layout = ({children} : {children :React.ReactNode}) => {
  return (
    <Fragment>
        <Header />
      {children}
      </Fragment>
  )
}

export default layout