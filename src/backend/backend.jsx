import React, { useState } from 'react';
import './style.css';

function Backend() {
    const [data, setData] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(''); // Estado para manejar errores

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        try {
            const postResponse = await fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: mensaje })
            });

            if (!postResponse.ok) {
                throw new Error(`HTTP error! status: ${postResponse.status}`);
            }

            const postData = await postResponse.json();
            console.log('POST response:', postData); // Depuración

            const getResponse = await fetch('http://localhost:3000/api/data');
            if (!getResponse.ok) {
                throw new Error(`HTTP error! status: ${getResponse.status}`);
            }

            const responseData = await getResponse.json();
            console.log('GET response:', responseData); // Depuración
            setData(responseData.message);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Hubo un problema al comunicarse con el servidor.');
        }
        setMensaje('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setMensaje(e.target.value)}
                    value={mensaje}
                    placeholder="Tu frase filosófica"
                />
                <button type="submit">Enviar</button>
            </form>
            <div>
                <h1>Backend</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar errores */}
                <p>{data}</p>
            </div>
        </>
    );
}

export default Backend;