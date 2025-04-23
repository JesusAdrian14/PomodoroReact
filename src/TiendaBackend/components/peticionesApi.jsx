import React, { useState, useEffect, createContext } from 'react';

export const datosContext = createContext();

function DatosProvider({ children }) { // Cambiado de "Home" a "DatosProvider"
    const [nombreProducto, setNombreProducto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [productos, setProductos] = useState([]);
    const [isDay, setIsDay] = useState(true);

    const obtenerProductos = async () => {
        try {
            const response = await fetch('http://localhost:3000/productos');
            if (!response.ok) {
                throw new Error('Error al obtener productos');
            }
            const data = await response.json();
            setProductos(data); // No se asignan estilos individuales aquí
        } catch (error) {
            console.error('Error al obtener productos:', error);
            alert('Error al obtener productos: ' + error.message);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombreProducto || !categoria || !precio || !stock) {
            throw new Error('Todos los campos son requeridos');
        }
        const producto = { nombreProducto, categoria, precio, stock };
        try {
            const response = await fetch('http://localhost:3000/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Producto agregado:', data);
                alert('Producto agregado correctamente');
                setNombreProducto("");
                setCategoria("");
                setPrecio(0);
                setStock(0);
                obtenerProductos();
            } else {
                const errorData = await response.json();
                console.error('Error al agregar producto:', errorData);
                alert('Error al agregar producto: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error al enviar producto:', error);
            alert('Error al enviar producto: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Producto eliminado correctamente');
                obtenerProductos(); // Actualizar la lista de productos
            } else {
                const errorData = await response.json();
                console.error('Error al eliminar producto:', errorData);
                alert('Error al eliminar producto: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Error al eliminar producto: ' + error.message);
        }
    };

    const handleEdit = (producto) => {
        setNombreProducto(producto.nombreProducto);
        setCategoria(producto.categoria);
        setPrecio(producto.precio);
        setStock(producto.stock);
        alert(`Editando producto: ${producto.nombreProducto}`);
    };

    const handleUpdate = async (producto) => {
        try {
            const response = await fetch(`http://localhost:3000/productos/${producto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(producto),
            });
            if (response.ok) {
                alert("Producto actualizado correctamente");
                obtenerProductos(); // Actualizar la lista de productos
            } else {
                const errorData = await response.json();
                console.error("Error al actualizar producto:", errorData);
                alert("Error al actualizar producto: " + errorData.error);
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("Error al actualizar producto: " + error.message);
        }
    };

    useEffect(() => {
        document.body.className = isDay ? "dia" : "noche";
    }, [isDay]);

    const navStyle = isDay ? {
        borderBottom: '2px solid black'
    } : {
        borderBottom: '2px solid white'
    }
    
    const estilos = isDay ? {
        backgroundColor: "#ffffff", // Fondo blanco
        color: "#000000",          // Texto negro
        border: "2px solid black", // Borde negro
    } : {
        backgroundColor: "#1b1b1b", // Fondo oscuro
        color: "#ffffff",           // Texto blanco
        border: "2px solid white",  // Borde blanco
    };

    
    const colorText = isDay ? {
        color: "#000000", // Texto negro
    } : {
        color: "#ffffff", // Texto blanco
    }

    const imagenes = isDay ? {
        reportar: "https://pomofocus.io/icons/graph-white.png",
        configuracion: "https://pomofocus.io/icons/config-white.png",
        DiaYnoche: "https://img.icons8.com/ios-filled/100/FAB005/landscape.png",
    } : {
        reportar: "https://img.icons8.com/wired/64/1A1A1A/list--v1.png",
        configuracion: "https://pomofocus.io/icons/config-black.png",
        DiaYnoche: "https://img.icons8.com/?size=48&id=gdiT0PPpz7l1&format=png",
    }


    return (
        <datosContext.Provider
            value={{
                nombreProducto,
                setNombreProducto,
                categoria,
                setCategoria,
                precio,
                setPrecio,
                stock,
                setStock,
                productos,
                setProductos,
                handleSubmit,
                isDay,
                estilos,
                setIsDay,
                colorText,
                imagenes,
                navStyle,
                handleDelete,
                handleEdit,
                handleUpdate,
            }}
        >
            {children}
        </datosContext.Provider>
    );
}

export default DatosProvider; // Exportar como "DatosProvider"