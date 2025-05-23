import React, { useContext} from "react";
import { configuraciones } from "../components/settings";
import { datosDeTemporisador } from "../components/timer";
import './style.css';

function BtnSettings() {
    const { handleGuardar, pomodoroRef, descansoCortoRef, descansoLargoRef, handleCheckbox, checked } = useContext(datosDeTemporisador);
    const { handleButtonSettings, BotonSettings, estilos } = useContext(configuraciones);

    const guardarCambios = () => {
        const seGuardoExitosamente = handleGuardar();
        if (seGuardoExitosamente) {
            handleButtonSettings();
        } else {
            alert("Por favor, ingresa valores entre 1 y 60 minutos");
        }
    };

    return (
        <section className={BotonSettings ? 'ocultar-ventana' : 'container-ventana-settings'}>
            
            <div className="ventana-settings">
                <h2 className="tittle-ventana-settings">Configuración</h2>
                <div className="configuracion-tiempos">
                    <label htmlFor="pomodoro">Pomodoro:</label>
                    <input ref={pomodoroRef} type="number" id="pomodoro" min="1" max="60" defaultValue={25} />
                    <label htmlFor="descanso-corto">Descanso corto:</label>
                    <input ref={descansoCortoRef} type="number" id="descanso-corto" min="1" max="60" defaultValue={5} />
                    <label htmlFor="descanso-largo">Descanso largo:</label>
                    <input ref={descansoLargoRef} type="number" id="descanso-largo" min="1" max="60" defaultValue={15} />
                </div>
                <div className="container-checkbox">
                    <input type="checkbox" id="desactivarColores" onChange={handleCheckbox} />
                    <label htmlFor="desactivarColores">FondoColor del descanso: {!checked? 'Activado' : 'Desactivado'}</label>
                </div>
            </div>
            <div className="container-botones-guardar-cancelar">
                <button style={estilos} onClick={guardarCambios} className="boton-guardar">Guardar</button>
                <button style={estilos} onClick={handleButtonSettings} className="boton-cancelar">Cancelar</button>
            </div>
        </section>
    );
}

export default BtnSettings;