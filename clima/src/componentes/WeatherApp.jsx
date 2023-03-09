import React, { useState, useEffect } from 'react';

const APIKey = "3d2857edfcc18fca2e122c14481c23a6";

function WeatherApp() {
  const [data, setData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); // Agrega un estado para el tipo de unidad de temperatura
  const [city, setCity] = useState("Bogotá"); // Agrega un estado para la ciudad
  const [country, setCountry] = useState(""); // Agrega un estado para el país

  useEffect(() => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setCountry(data.sys.country); // Actualiza el estado del país
      });
  }, [city]);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius); 
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  let temperature = Math.round(data.main.temp - 273.15);
  let unit = "°C";
  if (!isCelsius) {
    temperature = Math.round(temperature * 9 / 5 + 32); // Convierte a grados Fahrenheit
    unit = "°F";
  }

  // Asignamos el valor de la imagen según la temperatura
  let imagen = '';
  let backgroundColor = '';
  if (temperature >= 20 && temperature <= 35) {
    imagen = 'climaVerano.png';
    backgroundColor = 'yelow';
  } else if (temperature >= 17 && temperature <= 19) {
    imagen = 'climaPrimavera.png';
    backgroundColor = 'pink';
  } else {
    imagen = 'climaInvierno.png';
    backgroundColor = 'blue';
  }
  document.body.style.backgroundColor = backgroundColor;
  return (
    <div className="screen-container">
      <div className="weather-app">
        <h1>{data.name}, {country}</h1>

        <img className="absolute w-4/12 top-12 right-0 z-10"
  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
  alt=""
/>

        <p>{temperature}{unit}</p>
        <button onClick={toggleTemperatureUnit}>Cambiar unidad</button>
        
          
         
      </div>
    </div>
  );
  
}
export default WeatherApp;
