import React, { useContext } from 'react';
import { datosDeTemporisador } from '../components/timer';
import './styleSettings.css'
import { configuraciones } from '../components/settings';

function BtnReporte() {

    const [ reportes] = useContext(datosDeTemporisador);
    const [botonReport] = useContext(configuraciones);
    return (
        <>
            <section className={botonReport ? 'container-ventana-report' : 'ocultar-container-reporte'}>
                <div className="container-datos">
                    <ul>
                        {Object.entries(reportes).map(([fecha, datos]) => (
                            <li key={fecha}>
                                <strong>{fecha}</strong> : {datos.ciclos} ciclos, {datos.minutosEnPomodoro} min trabajo, {datos.minutosEnDescanso} min descanso
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
export default BtnReporte;