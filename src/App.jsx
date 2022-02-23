import { useState, useEffect } from 'react'
import Header from './COMPONENTS/Header'
import Modal from './COMPONENTS/Modal'
import ListadoGastos from './COMPONENTS/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
const [gastos, setGastos] = useState([])//estado inicial gastos, array vacio, se acumularan los gastos en forma de objetos

const [presupuesto, setPresupuesto]= useState(0) //estado inicial del valor de presupuesto, por default en cero
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false) //por default, al ser cero, el presupuesto al principio no es valido

const [modal, setModal]= useState(false)
const [animarModal, setAnimarModal] = useState(false)

const [gastoEditar, setGastoEditar]=useState({})//estado inicial como objeto vacío

useEffect(()=>{
  //verificamos si el objeto a editar tiene keys arriba de cero
  if(Object.keys(gastoEditar).length>0){
     
  setModal(true) //cambiando estado del modal

  setTimeout(()=>{
    setAnimarModal(true)
  }, 300 )
  }
},[gastoEditar])

const handleNuevoGasto = ()=>{
  
  setModal(true) //cambiando estado del modal
  setGastoEditar({}) //cuando es un nuevo gasto, regresamos el estado del formulario a vacio
//animacion de modal: cambiamos estado de modal a true para que se muestre despues de medio segundo
  setTimeout(()=>{
    setAnimarModal(true)
  }, 300 )
}

//generar un id para cada elmeneto del array:

const eliminarGasto = id =>{
 const gastosActualizados = gastos.filter(gasto=>gasto.id !== id)
 setGastos(gastosActualizados)
  // console.log(gastosActualizados) 
}


const guardarGasto = (gasto)=>{
  if(gasto.id){
    //actualizar gasto, si existe ID generado
    const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
    setGastos(gastosActualizados) // realizamos seteo con los gastos que se van a actualizar
    setGastoEditar({})
  }else{
    //Nuevo gasto, si no existe el ID
     //creamos el state en gastos, reemplazamos su valor con lo que recibimos de gasto ingresado en Modal.jsx
 gasto.id=generarId() //agregamos id para poder editar posteriormente
 gasto.fecha=Date.now();//agregamos fecha de registro de un gasto nuevo
 setGastos([...gastos, gasto])
  }
 // console.log(gasto) //recibe el objeto que se genera en el Modal.jsx
 setAnimarModal(false)
setTimeout(()=>{
     setModal(false)
 }, 300)
}

return (
    <div className={modal ? 'fijar': ''}>
      <Header
      gastos={gastos}
       presupuesto={presupuesto}
       setPresupuesto={setPresupuesto}
       isValidPresupuesto={isValidPresupuesto}
       setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
        <main>
          <ListadoGastos
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto = {eliminarGasto}
          />
        </main>
        <div className='nuevo-gasto'>
        <img src={IconoNuevoGasto}
           alt='icono nuevo gasto'
           onClick={handleNuevoGasto}
        />
      </div>
      </>
      )  }

      {modal&&<Modal 
      
           setModal={setModal}
           animarModal={animarModal}
           setAnimarModal={setAnimarModal}
           guardarGasto={guardarGasto}
           gastoEditar={gastoEditar}
           setGastoEditar ={setGastoEditar}
          />}
      </div>
    
    
  )
}

export default App
