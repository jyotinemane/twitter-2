import React, { useState, useEffect } from 'react';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
          initMap(latitude, longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const fetchWeather = (lat, lon) => {
      const apiKey = '53c242d487f3bf721af8ac4f9ef260dc';
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    };
    const initMap = (lat, lon) => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat, lng: lon },
        zoom: 8,
      });

      new window.google.maps.Marker({
        position: { lat, lng: lon },
        map: map,
        title: "User Location",
      });
    };

    getLocation();
  }, []);

  return (
    <div style={{marginLeft: '17rem', boxShadow: '1px 1px 1px 1px'}}>
      {location && (
        <div style={{textDecoration: 'none', boxShadow: '1px 1px 1px 1px', marginTop: '20px'}}>
          <h2>User's Location:</h2><hr/>
          <p>{`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</p>
          {weather && (
            
            <div>
              <h2>Weather Condition:</h2><hr/>
              <p>{`City: ${weather.name}, State: N/A, Country: ${weather.sys.country}`}</p>
              <p>{`Weather: ${weather.weather[0].main}, ${weather.weather[0].description}`}</p>
            </div>
          )}
        </div>
      )}
      <div id="map" style={{alignItems: 'start', height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default Location;
