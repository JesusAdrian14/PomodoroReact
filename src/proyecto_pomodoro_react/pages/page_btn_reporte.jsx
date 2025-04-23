import React, { useContext } from 'react';
import { datosDeTemporisador } from '../components/timer';
import { configuraciones } from '../components/settings';
import './style.css';

function BtnReporte() {
    const { guardarReporte } = useContext(datosDeTemporisador);
    const { botonReport } = useContext(configuraciones);

    return (
        <section className={botonReport ? 'container-ventana-report' : 'ocultar-ventana'}>
            <div className="container-datos">
                <ul>
                    {Object.entries(guardarReporte || {}).map(([fecha, datos]) => (
                        <li key={fecha}>
                            <strong>{fecha}</strong>: {datos.ciclos} ciclos, {datos.minutosEnPomodoro} min trabajo, {datos.minutosEnDescanso} min descanso
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default BtnReporte;