import React, { useState } from "react";
import "./props.css";

function Props() {
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ciudad, setCiudad] = useState("");

  const handleInputChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ciudad.trim() === "") {
      setError("Por favor, ingresa una ciudad válida");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://cities-temperature.p.rapidapi.com/weather/v1/current?location=${ciudad}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "cf0a881620msheaee640145d8eafp1006aajsn277349ca355d", // Reemplaza con tu clave de API
            "x-rapidapi-host": "cities-temperature.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del clima");
      }

      const data = await response.json();
      setResultado(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-temperatura">
          <h2>Clima en {ciudad}</h2>
          {resultado && (
            <div>
              <p>Lugar: {resultado.location}</p>
              <p>Temperatura: {resultado.temperature}°C</p>
              <p>Humedad: {resultado.humidity}%</p>
              <p>Descripción: {resultado.description}</p>
              <p>Viento: {resultado.wind_speed} km/h</p>
            </div>
          )}
        </div>
        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ciudad}
            onChange={handleInputChange}
            placeholder="Ingresa una ciudad"
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  );
}

export default Props;
