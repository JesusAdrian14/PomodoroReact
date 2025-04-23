// Objetivo: Crear un formulario para crear notas
import {React, useState} from 'react'
import './App.css'

function Estructura() {
  const [datos, setDatos] = useState({
    titulo: '',
    descripcion: ''
  })
  // Removed unused 'click' state variable
  const handleDatos = (e) => {
    e.preventDefault()
    setDatos({
      ...datos,
      [e.target.id]: e.target.value
    })
  }
  const EnviarDatos = (e) => {
    e.preventDefault()
    console.log(datos
    )
    // Removed setClick as 'click' is no longer used
  }


  const nota = () => {
    return (
      <>
      <div className="container">
        <h1>Crear Notas</h1>
        <form className='form'>
          <div className="form-group">
            <input onChange={handleDatos}  type="text" placeholder='Titulo' id="titulo" className="form-control titulo" />
          </div>
          <div className="form-group">
            <textarea onChange={handleDatos} id="descripcion" placeholder='Escrive tu nota' className="form-control descripcion"></textarea>
          </div>
          <button onClick={EnviarDatos} type="submit" className="btn btn-primary">Crear Nota</button>
        </form>
      </div>
      </>
    )

  }
  return nota();
}

export default Estructura
