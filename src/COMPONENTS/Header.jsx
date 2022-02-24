import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    setGastos,
    presupuesto, 
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
                    setGastos={setGastos}
                    gastos={gastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto} 
                    />
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