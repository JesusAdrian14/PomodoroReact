import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css'; // Estilos globales
/*
import Home from './proyecto_pomodoro_react/pages/home.jsx'; // Página principal
import Settings from './proyecto_pomodoro_react/components/settings.jsx'; // Contexto de configuración
import Timer from './proyecto_pomodoro_react/components/timer.jsx'; // Contexto del temporizador
import StatsPage from './proyecto_pomodoro_react/pages/stats_Page.jsx';
import ReportesPage from './proyecto_pomodoro_react/pages/page_btn_reporte.jsx';
import SettingPage from './proyecto_pomodoro_react/pages/page_btn_settings.jsx';
*/
import App from './medidorDePeso/App.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*
        <Settings>
            <Timer>
                {/* Renderizar las ventanas modales y el componente principal */}
                <StatsPage />
                <ReportesPage />
                <SettingPage />
                <Home />
            </Timer>
        </Settings>*/
        }
        <App />
    </StrictMode>
);
