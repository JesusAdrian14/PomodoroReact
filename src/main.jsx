import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globales
import Home from './proyecto_pomodoro_react/pages/home.jsx'; // Página principal
import Settings from './proyecto_pomodoro_react/components/settings.jsx'; // Contexto de configuración
import Timer from './proyecto_pomodoro_react/components/timer.jsx'; // Contexto del temporizador
import StatsPage from './proyecto_pomodoro_react/pages/stats_Page.jsx';
import ReportesPage from './proyecto_pomodoro_react/pages/reportes_Page.jsx';
import SettingPage from './proyecto_pomodoro_react/pages/settings_Page.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Settings>
            <Timer>
                <ReportesPage />
                <StatsPage />
                <SettingPage />
                <Home />
            </Timer>
        </Settings>
    </React.StrictMode>
);