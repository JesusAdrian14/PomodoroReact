import React, { useContext } from 'react';
import { datosDeTemporisador } from '../components/timer';
import { configuraciones } from '../components/settings';
import './style.css';

function BtnReporte() {
    const { reportes } = useContext(datosDeTemporisador);
    const { botonReport, handleButtonReport, estilos } = useContext(configuraciones);

    return (
        <section className={botonReport ? 'container-ventana-report' : 'ocultar-ventana'}>
            <div className="ventana-reportes">
                <h2 className="tittle-ventana-reportes">Reportes</h2>
                <div className="container-datos">
                    {Object.keys(reportes).length > 0 ? (
                        <ul className="lista-reportes">
                            {Object.entries(reportes).map(([fecha, datos]) => (
                                <li key={fecha} className="item-reporte">
                                    <strong>{fecha}</strong>: {datos.ciclos} ciclos, {datos.minutosEnPomodoro} min trabajo, {datos.minutosEnDescanso} min descanso
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="sin-reportes">No hay reportes disponibles</p>
                    )}
                </div>
            </div>
            <button style={estilos} onClick={handleButtonReport} className="boton-cerrar-reporte">Cerrar</button>
        </section>
    );
}

export default BtnReporte;