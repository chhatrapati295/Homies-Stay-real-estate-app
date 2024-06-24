import React from 'react'
import Header from './Header'

const Provider = ({children}:any) => {
  return (
    <div>
      <Header/>
      <div className="mt-20">
      {children}
      </div>
    </div>
  )
}

export default Provider
