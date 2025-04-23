import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globales
import Home from './proyecto_pomodoro_react/pages/home.jsx'; // Página principal
import Settings from './proyecto_pomodoro_react/components/settings.jsx'; // Contexto de configuración
import Timer from './proyecto_pomodoro_react/components/timer.jsx'; // Contexto del temporizador

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Settings>
            <Timer>
                <Home />
            </Timer>
        </Settings>
    </React.StrictMode>
);