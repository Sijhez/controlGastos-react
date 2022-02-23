import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
      //así mezclamos una clase fija con una clase dinámica
  )
}

export default Mensaje