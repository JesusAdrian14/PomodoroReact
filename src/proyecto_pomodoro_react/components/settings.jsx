import React, { createContext, useState, useEffect } from "react";

export const configuraciones = createContext();

function Settings({ children }) {
    const [isDay, setIsDay] = useState(true);
    const [BotonSettings, setBotonSettings] = useState(true);
    const [botonReport, setBotonReport] = useState(false);
    
    useEffect(() => {
        document.body.className = isDay ? "dia" : "noche";
    }, [isDay]);

    const handleButtonSettings = () => {
        setBotonSettings(!BotonSettings);
    }


    const handleButtonReport = () => {
        setBotonReport(!botonReport);
    }

    const estilos = isDay ? {
        backgroundColor: "#121212",
        color: "#ffffff",
        border: "2px solid white",
    } : {
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "2px solid black",
    };

    const navStyle = isDay ? {
        borderBottom: '2px solid black'
    } : {
        borderBottom: '2px solid white'
    }

    const colorText = isDay ? {
        color: "#000000",
    } : {
        color: "#ffffff",
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
        <configuraciones.Provider value={{
            isDay,
            setIsDay,
            estilos,
            colorText,
            imagenes,
            BotonSettings,
            handleButtonSettings,
            handleButtonReport,
            botonReport,
            navStyle
        }}>
            {children}
        </configuraciones.Provider>
    );
}

export default Settings;