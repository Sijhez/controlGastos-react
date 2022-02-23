import {useState, useEffect} from 'react'

const ControlPresupuesto = ({gastos,presupuesto}) => {
    //estado inicial de cantidad disponible
    const [disponible, setDisponible]=useState(0)
    //estado inicial de cantidad de dinero gastado
    const [gastado, setGastado]= useState(0)

    useEffect(()=>{
        //para definir el total gastado, usamos reduce, ya que el dato que recibe es un array de objetos
        //reduce suma usando un acumulado(total) y recorre cada cantidad(gasto.cantidad) y sumandola al total
      const totalGastado = gastos.reduce((total,gasto)=> gasto.cantidad+total,0) //cero es por que comenzamos desde esa cantidad
    
      const totalDisponible=presupuesto-totalGastado
     //seteamos el cambio en las variables usando el setDisponible y setGastado
      setDisponible(totalDisponible)//el valor seteado de cada variable se muestra abajo
      setGastado(totalGastado)
    },[gastos])//usamos el estado de gastos para activar el useEffect que hace la suma de gastos

    const formatearCantidad =(cantidad)=>{
        //formateado de la cantidad con api de JS para formatearla sin modificar el state original
       return cantidad.toLocaleString('en-US',{                     
            style:'currency', 
            currency:'USD'
        })

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>Gráfica aqui</p>
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>

            <p>
                {/* paso la variable del state, disponible y gastado creadas arriba, que van a ser seteada */}
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p>
        </div>
        </div>
  )
}

export default ControlPresupuesto