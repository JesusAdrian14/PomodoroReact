import React, { createContext, useState } from 'react';
import './App.css';
import VentanaNota from './Ventana-nota'; // Importar el componente VentanaNota

export const datosVentanaContext = createContext(); // Crear el contexto

function Estructura() {
  const [datos, setDatos] = useState({ titulo: '', descripcion: '' });
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [ventana, setVentana] = useState('');
  const [clickNota, setClickNota] = useState(null);
  const [datoVentana, setDatoVentana] = useState({}); // Estado para la nota seleccionada

  const handleDatos = (e) => {
    e.preventDefault();
    setDatos({ ...datos, [e.target.id]: e.target.value });
  };

  const EnviarDatos = (e) => {
    e.preventDefault();
    if (datos.titulo === '' || datos.descripcion === '') {
      setError('Todos los campos son obligatorios');
      setInputError(true);
      return;
    }
    if (datos.descripcion.length < 4) {
      setError('La descripción debe tener al menos 4 caracteres');
      setInputError(true);
      return;
    }
    const descripcionFormateada = datos.descripcion.replace(/\n/g, '<br>');
    if (editando) {
      setNotas(notas.map(nota => nota.id === idEditando ? { ...datos, descripcion: descripcionFormateada, id: idEditando } : nota));
      setEditando(false);
      setIdEditando(null);
    } else {
      setNotas([...notas, { ...datos, descripcion: descripcionFormateada, id: notas.length }]);
    }
    setDatos({ titulo: '', descripcion: '' }); // Limpiar los inputs
    setError('');
    setInputError(false);
  };

  const ventanaNota = (id) => {
    const notaSeleccionada = notas.find(nota => nota.id === id);
    setDatoVentana(notaSeleccionada); // Actualizar el estado con la nota seleccionada
    setVentana('nota-ventana'); // Actualizar el estado para mostrar la ventana
    setClickNota(id);
  };

  const eliminarNota = (id) => {
    setNotas(notas.filter(nota => nota.id !== id));
  };

  const editarNota = (id) => {
    const nota = notas.find(nota => nota.id === id);
    setDatos({ titulo: nota.titulo, descripcion: nota.descripcion.replace(/<br>/g, '\n') });
    setEditando(true);
    setIdEditando(id);
  };

  const formatearTexto = (texto) => {
    return texto.length > 30 ? texto.replace(/(.{30})/g, '$1<br>') : texto;
  };

  return (
    <datosVentanaContext.Provider value={{ ventana, setVentana, dato: datoVentana, datosVentana: setDatos }}>
      <div className="container">
        <h1>Crear Notas</h1>
        <form className='form' onSubmit={EnviarDatos}>
          <div className="form-group">
            <input onChange={handleDatos} type="text" placeholder='Titulo' id="titulo" className={`form-control titulo ${inputError && datos.titulo === '' ? 'input-error' : ''}`} value={datos.titulo} />
          </div>
          <div className="form-group">
            <textarea onChange={handleDatos} id="descripcion" placeholder='Escribe tu nota' className={`form-control descripcion ${inputError && datos.descripcion.length < 4 ? 'input-error' : ''}`} value={datos.descripcion}></textarea>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-enviar-datos btn-primary">{editando ? 'Guardar Cambios' : 'Crear Nota'}</button>
        </form>
        <div className="container-notas">
          <h2 className='subto-notas'>Notas</h2>
          {notas.length > 0 ? notas.map((dato) => (
            <div key={dato.id} className={`nota ${clickNota === true ? 'nota-ventana' : ''}`}>
              <div onClick={() => ventanaNota(dato.id)} className='titulo-nota'><h3 dangerouslySetInnerHTML={{ __html: formatearTexto(dato.titulo === '' ? dato.descripcion : dato.titulo) }}></h3></div>
              {clickNota === dato.id && <div className='descripcion-nota'><p dangerouslySetInnerHTML={{ __html: formatearTexto(dato.descripcion) }}></p></div>}
              <div className="container-botones">
                <button onClick={() => eliminarNota(dato.id)} className="boton-eliminar">Eliminar</button>
                <button onClick={() => editarNota(dato.id)} className="boton-editar">Editar</button>
              </div>
            </div>
          )) : <p>No hay notas disponibles</p>}
        </div>
        <VentanaNota />
      </div>
    </datosVentanaContext.Provider>
  );
}

export default Estructura;
