import React, {useContext} from 'react';
import { datosContext } from '../components/peticionesApi';

function AddInventario() {
    const { nombreProducto, setNombreProducto, handleSubmit, categoria, setCategoria, precio, setPrecio, stock, setStock } = useContext(datosContext);

    const handlePrecioChange = (e) => {
        const value = e.target.value;
        setPrecio(value === "" ? 0 : parseFloat(value));
    };

    const handleStockChange = (e) => {
        const value = e.target.value;
        setStock(value === "" ? 0 : parseInt(value));
    };

    return (
        <>
        <h2>Agregar productos</h2>
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="nombre-producto">Nombre del Producto:</label>
            <input type="text" id="nombre-producto" onChange={(e) => setNombreProducto(e.target.value)} value={nombreProducto} placeholder="Nombre del Producto" />
            
            <label htmlFor="categoria">Categoría:</label>
            <input type="text" id="categoria" onChange={(e) => setCategoria(e.target.value)} value={categoria} placeholder="Categoría" />
            
            <label htmlFor="precio">Precio:</label>
            <input type="number" id="precio" onChange={handlePrecioChange} value={precio === 0 ? "" : precio} placeholder="Precio" />
            
            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" onChange={handleStockChange} value={stock === 0 ? "" : stock} placeholder="Stock" />
            
            <button type="submit" style={{ gridColumn: "1 / -1", justifySelf: "center" }}>Agregar Producto</button>
        </form>
        </>
    );
}
export default AddInventario;