import React, { useContext, useState } from "react";
import { datosContext } from "../components/peticionesApi";

function Home() {
    const { productos, handleDelete, estilos, handleUpdate } = useContext(datosContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editProducto, setEditProducto] = useState(null);

    const openEditForm = (producto) => {
        setEditProducto(producto);
        setIsEditing(true);
    };

    const closeEditForm = () => {
        setIsEditing(false);
        setEditProducto(null);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editProducto);
        closeEditForm();
    };

    return (
        <>
            <main className="container-home">
                <h1 className="title">Inventario</h1>
                <table className="table" >
                    <thead>
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.categoria}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(producto.id)}
                                        className="button-eliminar"
                                        style={estilos}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => openEditForm(producto)}
                                        className="button-editar"
                                        style={estilos}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {isEditing && (
                <div className="edit-window" style={estilos}>
                    <h2>Editar Producto</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                value={editProducto.nombreProducto}
                                onChange={(e) =>
                                    setEditProducto({ ...editProducto, nombreProducto: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Categoría:
                            <input
                                type="text"
                                value={editProducto.categoria}
                                onChange={(e) =>
                                    setEditProducto({ ...editProducto, categoria: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Precio:
                            <input
                                type="number"
                                value={editProducto.precio}
                                onChange={(e) =>
                                    setEditProducto({ ...editProducto, precio: parseFloat(e.target.value) })
                                }
                            />
                        </label>
                        <label>
                            Stock:
                            <input
                                type="number"
                                value={editProducto.stock}
                                onChange={(e) =>
                                    setEditProducto({ ...editProducto, stock: parseInt(e.target.value) })
                                }
                            />
                        </label>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={closeEditForm}>
                            Cancelar
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Home;