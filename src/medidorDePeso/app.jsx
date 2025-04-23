import React, {useState, useRef} from "react";
import "./style.css";

function App(){
    const [resultado, setResultado] = useState(null);
    const [viewImage, setviewImage] = useState(false);
    const videoRef = useRef(null);
    let boolean = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        const altura = parseFloat(e.target.altura.value);
        const peso = parseFloat(e.target.peso.value);

        
        if (altura >= 2.5 || altura.length > 3) {
            altura / 100;
            return altura;
        }

        const imc = (peso / (altura * altura)).toFixed(2);
        let mensaje = "";

        if (imc < 18.5) {
            mensaje = "Peso inferior al normal";
        } else if (imc >= 18.5 && imc < 24.9) {
            mensaje = "Peso normal";
        } else if (imc >= 25 && imc < 29.9) {
            mensaje = "Peso superior al normal";
        } else {
            mensaje = "Obesidad";
            setviewImage(true);
            videoRef.current.play(); // Reproducir el audio
            setTimeout(() => {
                setviewImage(false);
                videoRef.current.paused(); // Reproducir el audio
            }, 5000); // Detener el video después de 5 segundos
        }
        setResultado({ altura, imc, mensaje, peso });
        e.target.reset(); // Limpiar los campos del formulario
    }
    const validarFormulario = (e) => {
        const altura = e.target.altura.value;
        const peso = e.target.peso.value;
        if (altura === "" || peso === "") {
            alert("Por favor, completa todos los campos.");
            boolean = true;
            return false;
        }
        if (isNaN(altura) || isNaN(peso)) {
            alert("Por favor, ingresa valores numéricos válidos.");
            boolean = true;
            return false;
        }
        return true;
    }
    return(
        <>
        <div className="container">
            <div className="container-temperatura">
                <h2>Medidor de Peso</h2>
                <form id="formulario" onChange={validarFormulario} onSubmit={handleSubmit}>
                    <input className={boolean? 'rojo' : ''} type="text" onChange={validarFormulario} placeholder="Ingresa tu altura" id="altura" />
                    <input className={boolean? 'rojo' : ''} type="text" onChange={validarFormulario} placeholder="Ingresa tu peso" id="peso" />
                    <button type="submit">Enviar</button>
                </form>
                {resultado && (
                    <div className="resultado">
                        <p>Tu altura es: {resultado.altura}</p>
                        <p>Tu peso es: {resultado.peso}</p>
                        <p>Tu IMC es: {resultado.imc}</p>
                        <p>{resultado.mensaje}</p>
                    </div>
                )}
                {viewImage && (
                    <div className="container-video">
                        <img className='girar' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0wYGtVlsW9hMin0xJH2jJdCZEkOU9h-uHYg&s" alt="Prohibido gordas" />
                        <audio ref={videoRef} src="/proyecto-1/src/medidorDePeso/oyegelda_escuchate_esto.mpeg"></audio>
                    </div>
                )}

            </div>
        </div>
        </>
    )
    }
export default App;