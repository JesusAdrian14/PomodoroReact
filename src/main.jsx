import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globales
import Backend from './backend/backend.jsx';
// Renderiza el componente App en el elemento root
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Backend />
    </React.StrictMode>
);