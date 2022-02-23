import { useState, useEffect } from 'react'
import BtnClose from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, 
  animarModal,
  setAnimarModal,
  guardarGasto, 
  gastoEditar,
  setGastoEditar}) => {
   const [mensaje, setMensaje]=useState('')
  
  const[nombre, setNombre]=useState('')
  const[cantidad, setCantidad] = useState('')
  const[categoria, setCategoria] = useState('')
  const[fecha, setFecha] = useState('')
  //estado para reconocer el id del gasto, si se quiere editar
  const [id, setId] = useState('')

  //useEffect para verificar cuando el componente este listo
useEffect(()=>{
  //si el gastoEditar viene con keys validos, seteamos los valores de cada elemento del formulario con la info del gastoEditar
  if(Object.keys(gastoEditar).length>0){
    setNombre(gastoEditar.nombre)
    setCantidad(gastoEditar.cantidad)
    setCategoria(gastoEditar.categoria)
    setId(gastoEditar.id)
    setFecha(gastoEditar.fecha)
  }
},[])

    const ocultarModal=()=>{
        //console.log('ocultando')
        setGastoEditar({})
        setAnimarModal(false)

        setTimeout(()=>{
            setModal(false)
        }, 300)
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!nombre || !cantidad || !categoria){
        setMensaje('Todos los campos son obligatorios')
        //este de abajo ayuda a que el mensaje se borre
        setTimeout(()=>{
          setMensaje('')
        },3000)
        return
      }
      //construyo el objeto con la data recibida en Modal
      //se imprime en consola desde App.js
      guardarGasto({nombre, cantidad, categoria, id, fecha})

    }
    
  return (
    <div className="modal">
     <div className="cerrar-modal">
         <img src={BtnClose}
            alt='Cerrar modal'
            onClick={ocultarModal}
         />
     </div>                      
      <form 
      onSubmit={handleSubmit}
      className={`formulario ${ animarModal ? 'animar' : 'cerrar'}`}>
          {/* condicional: si animar modal es true, entonces agregamos class animar, si no, agregamos cerrar */}
          <legend>{gastoEditar.nombre ? 'Editar Gasto':'Nuevo Gasto'}</legend>
          {mensaje&&<Mensaje tipo='error'>{mensaje}</Mensaje>}
          <div className="campo">
            <label htmlFor='nombre'>Nombre Gasto</label>
            <input 
            id='nombre'
            type='text'
            placeholder='Añade el nombre del gasto'
            value={nombre}
            onChange={e=>setNombre(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor='cantidad'>Cantidad</label>
            <input 
            id='cantidad'
            type='text'
            placeholder='Añade la cantidad del gasto. Ej.300'
            value={cantidad}
            onChange={e=>setCantidad(Number(e.target.value))}
            />
          </div>

          <div className="campo">
            <label htmlFor='categoria'>Categoría</label>
            <select 
            id='categoria'
            value={categoria}
            onChange={e=>setCategoria(e.target.value)}
            >
              <option value=''>--Seleccione--</option>
              <option value='ahorro'>Ahorro</option>
              <option value='comida'>Comida</option>
              <option value='casa'>Casa</option>
              <option value='gastos'>Gastos Varios</option>
              <option value='ocio'>Ocio</option>
              <option value='salud'>Salud</option>
              <option value='suscripciones'>Suscripciones</option>
            </select>
          </div>
          <input
           type='submit'
           value={gastoEditar.nombre ? 'Guardar cambio' : 'Añadir gasto'}
          />

      </form>

    </div>
  )
}

export default Modal