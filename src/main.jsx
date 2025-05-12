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
import Estructura from './creadorDeNotas/componentes/Estructura';
import Ventana from './creadorDeNotas/componentes/Ventana-nota.jsx';
//import App from './medidorDePeso/app.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*
        <Settings>
            <Timer>
                <StatsPage />
                <ReportesPage />
                <SettingPage />
                <Home />
            </Timer>
        </Settings>*/
        }
        <Estructura>
            <Ventana />
        </Estructura>
        
    </StrictMode>
);
