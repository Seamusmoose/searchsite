import React, { useState, useEffect } from "react";
import axios from "axios";

const MarsWeather = () => {
  const [weatherData, setWeaterData] = useState({});

  const weatherURL = `https://api.maas2.apollorion.com/`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const { data } = await axios.get(weatherURL);
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1>Last recorded Mars Weather with Curiosty Rover</h1>
      <div></div>
    </div>
  );
};

export default MarsWeather;
