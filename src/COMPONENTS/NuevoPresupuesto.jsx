import {useState} from 'react'
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    //estado de un mensaje de validación para el formulario
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e)=>{
        e.preventDefault();//cuando entra un numero en un input, se recibe como string, siempre se debe convertir a numero antes de ser validado
       if(!presupuesto || presupuesto<=0){
           setMensaje('No es un presupuesto valido')
           return
        }
        //resetea contenido de mensaje, cuando se ingresó cantidad válida
        setMensaje('')
        //setear el valor de isValidPresupuesto
        setIsValidPresupuesto(true)
        console.log(Number(presupuesto))
    }
    
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={handlePresupuesto} action="" className='formulario'>
           <div className='campo'>
               <label htmlFor="">Definir Presupuesto</label>
                   <input type="number" 
                      className='nuevo-presupuesto'
                       placeholder='Añade tu presupuesto' 
                       value={presupuesto} 
                   onChange={(e)=>setPresupuesto(Number(e.target.value))}//todo numero recibido se convierte en Number por completo
                   />
           </div>
           <input type='submit' value='Añadir'/>
           {mensaje&& <Mensaje tipo='error'>{mensaje}</Mensaje>}
       </form>
    </div>
  )
}

export default NuevoPresupuesto