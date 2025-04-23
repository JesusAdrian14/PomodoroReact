import React, { useState, useEffect, createContext, useRef } from "react";
import "./style.css";

// Crear el contexto
export const datosDeTemporisador = createContext();

function Timer({ children }) {
    const [tiempoTotal, setTiempoTotal] = useState(() => {
        const savedTime = localStorage.getItem("tiempoTotal");
        return savedTime
            ? JSON.parse(savedTime)
            : { pomodoro: 25, descanso: 5, descansoLargo: 15 }; // Valores predeterminados
    });

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(tiempoTotal.pomodoro * 60);
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [cycleCount, setCycleCount] = useState(0); // Contador de ciclos completados
    const styleRef = useRef(null);
    const [repeticiones, setRepeticiones] = useState(0); // Contador de repeticiones

    // Refs para inputs
    const pomodoroRef = useRef(null);
    const descansoCortoRef = useRef(null);
    const descansoLargoRef = useRef(null);

    // Guardar datos en localStorage cuando `tiempoTotal` cambie
    useEffect(() => {
        localStorage.setItem("tiempoTotal", JSON.stringify(tiempoTotal));
    }, [tiempoTotal]);

    const handlePomodoroChange = (e) => {
        const nuevoPomodoro = parseInt(e.target.value, 10);
        if (!isNaN(nuevoPomodoro) && nuevoPomodoro > 0) {
            setTiempoTotal((prevState) => ({
                ...prevState,
                pomodoro: nuevoPomodoro,
            }));
        }
    };

    const handleDescansoCortoChange = (e) => {
        const nuevoDescansoCorto = parseInt(e.target.value, 10);
        if (!isNaN(nuevoDescansoCorto) && nuevoDescansoCorto > 0) {
            setTiempoTotal((prevState) => ({
                ...prevState,
                descanso: nuevoDescansoCorto,
            }));
        }
    };

    const handleDescansoLargoChange = (e) => {
        const nuevoDescansoLargo = parseInt(e.target.value, 10);
        if (!isNaN(nuevoDescansoLargo) && nuevoDescansoLargo > 0) {
            setTiempoTotal((prevState) => ({
                ...prevState,
                descansoLargo: nuevoDescansoLargo,
            }));
        }
    };

    const handleGuardar = () => {
        const nuevoPomodoro = parseInt(pomodoroRef.current.value, 10);
        const nuevoDescansoCorto = parseInt(descansoCortoRef.current.value, 10);
        const nuevoDescansoLargo = parseInt(descansoLargoRef.current.value, 10);

        if (
            nuevoPomodoro >= 1 &&
            nuevoPomodoro <= 60 &&
            nuevoDescansoCorto >= 1 &&
            nuevoDescansoCorto <= 60 &&
            nuevoDescansoLargo >= 1 &&
            nuevoDescansoLargo <= 60
        ) {
            setTiempoTotal({
                pomodoro: nuevoPomodoro,
                descanso: nuevoDescansoCorto,
                descansoLargo: nuevoDescansoLargo,
            });

            setIsRunning(false);
            setTime(nuevoPomodoro * 60);
            return true;
        }
        return false;
    };

    const formatTime = (time) => {
        const minutos = Math.floor(time / 60).toString().padStart(2, "0");
        const segundos = (time % 60).toString().padStart(2, "0");
        return `${minutos}:${segundos}`;
    };
    /*
        useEffect(() => {
            if (isRunning && time > 0) {
                const timer = setTimeout(() => {
                    setTime((prevTime) => prevTime - 1);
                }, 1000);
    
                return () => clearTimeout(timer);
            } else if (time === 0) {
                if (isPomodoro) {
                    // Alternar entre descanso corto y largo según el ciclo
                    if (cycleCount === 3) {
                        setTime(tiempoTotal.descansoLargo * 60);
                        setCycleCount(0); // Reiniciar el contador de ciclos
                        setRepeticiones((Prevrepeticiones) => Prevrepeticiones + 1); // Incrementar el contador de repeticiones                }
                    } else if (cycleCount <= 2) {
                        setTime(tiempoTotal.descanso * 60);
                        setCycleCount((prevCount) => prevCount + 1);
                        setRepeticiones((Prevrepeticiones) => Prevrepeticiones + 1); // Incrementar el contador de repeticiones                }
                        styleRef.current.style.backgroundColor = "#53ff4d"; // Cambiar el color de fondo a verde
                    } else {
                        setTime(tiempoTotal.pomodoro * 60);
                        setRepeticiones((Prevrepeticiones) => Prevrepeticiones + 1); // Incrementar el contador de repeticiones
                    }
                    setIsPomodoro(!isPomodoro); // Alternar el estado
                    setIsRunning(false); // Pausar automáticamente
                }
            }
        }, [isRunning, time, isPomodoro, tiempoTotal, cycleCount]);
    */
    function guardarReporte(tiempoTotal, tipo) {
        const hoy = new Date().toLocaleDateString("es-CO");
        const reportes = JSON.parse(localStorage.getItem("reportes")) || {};

        if (!reportes[hoy]) {
            reportes[hoy] = {
                ciclos: 0,
                minutosEnPomodoro: 0,
                minutosEnDescanso: 0,
            };
        }

        if (tipo === "pomodoro") {
            reportes[hoy].ciclos += 1;
            reportes[hoy].minutosEnPomodoro += tiempoTotal.pomodoro;
        } else if (tipo === "descanso") {
            reportes[hoy].minutosEnDescanso += tiempoTotal.descanso;
        } else if (tipo === "descansoLargo") {
            reportes[hoy].minutosEnDescanso += tiempoTotal.descansoLargo;
        }

        localStorage.setItem("reportes", JSON.stringify(reportes));
    }

    useEffect(() => {
        if (isRunning && time > 0) {
            const timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (time === 0) {
            if (isPomodoro) {
                // Ciclo de trabajo terminado
                if (cycleCount === 3) {
                    setTime(tiempoTotal.descansoLargo * 60);
                    setCycleCount(0);
                    guardarReporte(tiempoTotal, "descansoLargo");
                } else {
                    setTime(tiempoTotal.descanso * 60);
                    setCycleCount((prevCount) => prevCount + 1);
                    guardarReporte(tiempoTotal, "descanso");
                }

                styleRef.current.style.backgroundColor = "#53ff4d";
            } else {
                // Descanso terminado -> nuevo Pomodoro
                setTime(tiempoTotal.pomodoro * 60);
                guardarReporte(tiempoTotal, "pomodoro");
            }

            setRepeticiones((prev) => prev + 1);
            setIsPomodoro((prev) => !prev);
            setIsRunning(false);
        }
    }, [isRunning, time, isPomodoro, tiempoTotal, cycleCount]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTime(tiempoTotal.pomodoro * 60);
        setIsPomodoro(true);
        setCycleCount(0); // Reiniciar el contador de ciclos
    };

    useEffect(() => {
        console.log("Repeticiones actualizadas:", repeticiones);
    }, [repeticiones]);



    return (
        <datosDeTemporisador.Provider
            value={{
                formatTime,
                time,
                isRunning,
                start,
                pause,
                reset,
                styleRef,
                tiempoTotal,
                handlePomodoroChange,
                handleDescansoCortoChange,
                handleDescansoLargoChange,
                handleGuardar,
                pomodoroRef,
                descansoCortoRef,
                descansoLargoRef,
                setTiempoTotal,
                cycleCount,
                repeticiones,
                guardarReporte,
            }}
        >
            {children}
        </datosDeTemporisador.Provider>
    );
}

export default Timer;