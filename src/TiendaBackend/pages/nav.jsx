import React, {useContext} from 'react';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom
import { datosContext } from '../components/peticionesApi';



function Nav() {
    const {isDay,setIsDay, estilos, imagenes, navStyle, colorText} = useContext(datosContext); // Obtener el contexto de configuraciones
    
    const toggleTheme = () => {
        setIsDay(prev => !prev); // Cambiar el estado del tema
    }
    
    return (
        <nav className='nav' style={navStyle}>
            <h1>Inventario Junior</h1>
            <ul>
                <li style={estilos}>
                    <Link style={colorText} className="link" to="/">Home</Link>
                </li>
                <li style={estilos}>
                    <Link style={colorText} className="link" to="/add">Agregar Producto</Link>
                </li>
            </ul>
            <button
                    id="button"
                    className="button-report"
                    onClick={toggleTheme}
                    style={estilos}
                >
                    <img
                        src={imagenes.DiaYnoche}
                        alt={isDay ? 'Modo Noche' : 'Modo Día'}
                    />
                    {!isDay ? "Modo Noche" : "Modo Día"}
            </button>
        </nav>
    );
}
export default Nav;