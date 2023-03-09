import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './componets/Card';
import Search from './componets/Search';
import Loader from './componets/Loader';

const App = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const getWeatherInfo = async (lat, lng) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=sp&appid=e9606858d9677efc127ee736ed7c8e69&units=metric`;
      const response = await axios.get(url);
      setWeatherInfo(response.data);
      setCoordinates({ lat, lng });
      return {
        lat,
        lng,
      };
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      getWeatherInfo(pos.coords.latitude, pos.coords.longitude);
    });
  }, []);
  const getBackground = () => {
    if (weatherInfo) {
      if (weatherInfo.weather[0].main.includes('clear')) {
        return 'radial-gradient(50% 50% at 50% 50%, pink 0%, yellow 100%)';
      } else if (weatherInfo.weather[0].main.includes('clouds')) {
        return 'radial-gradient(50% 50% at 50% 50%, gray 0%, skyblue 100%)';
      } else if (weatherInfo.weather[0].main.includes('rain')) {
        return 'radial-gradient(50% 50% at 50% 50%, gray 0%, cornflowerblue 100%)';
      } else if (weatherInfo.weather[0].main.includes('thunderstorm')) {
        return 'radial-gradient(50% 50% at 50% 50%, gray 0%, rebeccapurple 100%)';
      } else if (weatherInfo.weather[0].main.includes('snow')) {
        return 'radial-gradient(50% 50% at 50% 50%, gray 0%, white 100%)';
      }
    }
  };
  return (
    <div className="principal__Container" style={{ background: getBackground() }}>
      <Search getWeatherInfo={getWeatherInfo} />
      {weatherInfo ? (
        <Card
          weatherInfo={weatherInfo}
          coordinates={coordinates.lat && coordinates.lng ? coordinates : null}
        />
      ) : (
        <Loader />
      )}
      <div className="footer">
        <marquee>
          <a
            href="https://juanitho007.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visita mis otros proyectos
          </a>
        </marquee>
        <p>
          <span>&#x276e;Hecho con </span>
          <a href="https://www.academlo.com/" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-heart-pulse"></i>
          </a>
          <span> en Academlo&#x276f;_</span>
        </p>
      </div>
    </div>
  );
};

export default App;
