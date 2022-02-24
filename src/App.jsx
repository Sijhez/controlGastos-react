import { useState, useEffect } from 'react'
import Header from './COMPONENTS/Header'
import Modal from './COMPONENTS/Modal'
import ListadoGastos from './COMPONENTS/ListadoGastos'
import Filtros from './COMPONENTS/Filtros'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
const [gastos, setGastos] = useState(
  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
)//estado inicial gastos, comprobamos si existe un almacenamiento en localStorage, si existe lo extraemos y se agrega como estado inicial, si no, se agrega un array vacío

//estado inicial del valor de presupuesto, si se ha agregado un nuevo valor en el local storage, pregunta por el, si existe, se agrega al estate, si no, se agrega el cero
const [presupuesto, setPresupuesto]= useState(Number(localStorage.getItem('presupuesto') ?? 0)) 
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false) //por default, al ser cero, el presupuesto al principio no es valido

const [modal, setModal]= useState(false)
const [animarModal, setAnimarModal] = useState(false)

const [gastoEditar, setGastoEditar]=useState({})//estado inicial como objeto vacío

const [filtro, setFiltro] = useState('')
const [gastosFiltrados, setGastosFiltrados] = useState([])
//useEffect para editar gasto, si cambia el state de gastoEditar, entra el useEffect
useEffect(()=>{
  //verificamos si el objeto a editar tiene keys arriba de cero
  if(Object.keys(gastoEditar).length>0){
     
  setModal(true) //cambiando estado del modal

  setTimeout(()=>{
    setAnimarModal(true)
  }, 300 )
  }
},[gastoEditar])

//useEffect para almacenar el presupuesto en localStorage
useEffect(()=>{
   // almacenamiento de presupuesto en local storage
   //siempre se agregará un valor, si    
   localStorage.setItem('presupuesto', presupuesto ?? 0 )
},[presupuesto])

//useEffect para comprobar que exista presupuesto en localStorage
useEffect(()=>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto')?? 0)
  //hacemos la comprobación, si existe el valor el localStorage, comprobamos que sea mayor a cero, si es así, seteamos el valor de isValidPresupuesto a true, mostrando la otra pantalla
   if(presupuestoLS > 0){
     setIsValidPresupuesto(true)
   }
  
}, [])

//useEffect para almacenar gastos en Local Storage
useEffect(()=>{
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
},[gastos])

useEffect(()=>{
   if(filtro){
     //filtrando gastos por categoria
     const gastosFiltrados = gastos.filter(gasto=>gasto.categoria === filtro)
     setGastosFiltrados(gastosFiltrados)
      
   }
},[filtro])


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

return ( //si el modal se vuelve true, agrego class fijar, si no, no se agrega nada
    <div className={modal ? 'fijar': ''}>
      <Header
      gastos={gastos}
      setGastos={setGastos}
       presupuesto={presupuesto}
       setPresupuesto={setPresupuesto}
       isValidPresupuesto={isValidPresupuesto}
       setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
       
        <main>
        <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
        />
          <ListadoGastos
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto = {eliminarGasto}
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
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
