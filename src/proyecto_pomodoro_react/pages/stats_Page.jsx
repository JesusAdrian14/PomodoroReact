import React, { useContext } from "react";
import { configuraciones } from "../components/settings";

function StatsPage() {
    const { isDay, setIsDay, estilos, imagenes, handleButtonSettings, handleButtonReport, navStyle } = useContext(configuraciones);

    const toggleTheme = () => {
        setIsDay(prev => !prev);
    };

    return (
        <nav style={navStyle} className="nav">
            <button id="button" onClick={handleButtonReport} style={estilos} className="button-report">
                <img
                    className='img'
                    src={imagenes.reportar}
                    alt="Reporte sobre el tiempo estudiado con pomodoro"
                />
                Report
            </button>
            <button onClick={handleButtonSettings} style={estilos} id="button" className="button-report">
                <img
                    className='img'
                    src={imagenes.configuracion}
                    alt="Configuración del pomodoro"
                />
                Settings
            </button>
            <button
                id="button"
                className="button-report"
                onClick={toggleTheme}
                style={estilos}
            >
                <img
                    className='img'
                    src={imagenes.DiaYnoche}
                    alt={isDay ? 'Modo Noche' : 'Modo Dia'}
                />
                {!isDay ? "Modo Noche" : "Modo Día"}
            </button>
        </nav>
    );
}

export default StatsPage;