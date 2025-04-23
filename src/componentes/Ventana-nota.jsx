import React, { useContext } from "react";
import "./Ventana-nota.css";
import { datosVentanaContext } from "./Estructura"; // Importar el contexto correctamente

function VentanaNota() {
  const { ventana, dato, setVentana } = useContext(datosVentanaContext); // Usar el contexto correctamente

  const handleButton = () => {
    setVentana(''); // Cerrar la ventana
  };

  return (
    <div>
      {ventana === 'nota-ventana' && (
        <div className='nota-ventana'>
          <button onClick={handleButton} type="button" className="quitar-ventana">x</button>
          <h2>Wao tu nota😁🙌</h2>
          <div className="container-nota">
            <div className="titulo-nota"><h2>{dato.titulo}</h2></div>
            <div className="descripcion-nota"><p>{dato.descripcion}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VentanaNota;