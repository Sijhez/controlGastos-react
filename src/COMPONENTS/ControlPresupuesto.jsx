import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
const ControlPresupuesto = ({
    gastos,
    setGastos,
    setPresupuesto,
    presupuesto,
    setIsValidPresupuesto}) => {

    const[porcentaje, setPorcentaje]=useState(0)

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

      //calculo del porcentaje que resta del presupuesto: para usar en la gráfica:
      const nuevoPorcentaje = (( (presupuesto-totalDisponible)/presupuesto )*100).toFixed(2)
      

      setDisponible(totalDisponible)//el valor seteado de cada variable se muestra abajo
      setGastado(totalGastado)
 
      setTimeout(()=>{
        setPorcentaje(nuevoPorcentaje)
      },1000)

    },[gastos])//usamos el estado de gastos para activar el useEffect que hace la suma de gastos

    const formatearCantidad =(cantidad)=>{
        //formateado de la cantidad con api de JS para formatearla sin modificar el state original
       return cantidad.toLocaleString('en-US',{                     
            style:'currency', 
            currency:'USD'
        })

    }

    const handleResetApp = () =>{
       const resultado = confirm('Deseas reiniciar presupuesto y gastos?')

       if(resultado){
           setGastos([])
           setPresupuesto(0)
           setIsValidPresupuesto(false)
       }

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
            value={porcentaje}
            //MODIFICANDO EL ESTILO DE LA GRÁFICA
            styles={
                buildStyles({
                    pathColor: porcentaje>100 ?'#dc2626' :'#3B82F6',
                    trailColor:'#F5F5F5',
                    textSize: '11px',
                    textColor:porcentaje>100 ?'#dc2626' :'#3B82F6'
                })
            }
            text={`${porcentaje}% Gastado`}
            >

            </CircularProgressbar>
        </div>
        <div className='contenido-presupuesto'>
            <button
              className='reset-app'
              type='button'
              onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo': '' }`}>
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