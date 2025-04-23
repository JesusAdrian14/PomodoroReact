import React, { useContext } from "react";
import { datosDeTemporisador } from "../components/timer";
import './style.css'
import { configuraciones } from "../components/settings";

function Home() {
    const { estilos, colorText } = useContext(configuraciones);
    const { time, formatTime, pause, start, reset, isRunning, styleRef } = useContext(datosDeTemporisador);

    return (
        <main className="container-timer" ref={styleRef}>
            <h2 className="tittle-proyect" style={colorText}>Pomodoro Timer</h2>
            <div className="time" style={colorText}>{formatTime(time)}</div>
            <div className="timer-buttons">
                <button 
                    style={estilos}
                    className="start-button"
                    onClick={start} 
                    disabled={isRunning}
                >
                    Start
                </button>
                <button
                    style={estilos}
                    className="pause-button" 
                    onClick={pause} 
                    disabled={!isRunning}
                >
                    Pause
                </button>
                <button 
                    style={estilos}
                    className="reset-button" 
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
        </main>
    );
}

export default Home;