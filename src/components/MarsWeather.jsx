import React, { useState, useEffect } from "react";
import axios from "axios";

const MarsWeather = () => {
  const weatherURL = `https://api.maas2.apollorion.com/`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const { data } = await axios.get(weatherURL);

      console.log(data);
    };

    fetchWeatherData();
  }, []);

  const handleDateChange = () => {};

  return (
    <div>
      <h1>Here is the weather comp</h1>
      <div></div>
      <div>
        {/* <input
          name="date"
          type="date"
          //   min={RoverDateSelectorMin(roverVal)}
          //   max={RoverDateSelectorMax(roverVal)}
          //   value={queryData.latestEarthDate}
          onChange={handleDateChange}
        /> */}
      </div>
    </div>
  );
};

export default MarsWeather;
