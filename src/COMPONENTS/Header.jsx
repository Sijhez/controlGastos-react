import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto, 
    setPresupuesto,
    isValidPresupuesto, 
    setIsValidPresupuesto,
    gastos }) => {
  return (
    <header>
        <h1>
            Planificador de gastos</h1> 
            {
                isValidPresupuesto ? (
                    <ControlPresupuesto
                    gastos={gastos}
                    presupuesto={presupuesto}/>
                ):(
                    <NuevoPresupuesto
                 setIsValidPresupuesto={setIsValidPresupuesto} 
                 presupuesto={presupuesto}
                 setPresupuesto={setPresupuesto}
                />
                )
            } 
            
            
            </header>
  )
}

export default Header