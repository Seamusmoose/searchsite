import React, { useState, useEffect } from "react";
import axios from "axios";
import RoverCard from "./RoverCard";
import "../rover.css";

const rover = ["Curiosity", "Opportunity", "Spirit"];

const MarsRover = () => {
  const [roverData, setRoverData] = useState([]);
  const [roverVal, setRoverVal] = useState(rover[0]);
  const [queryData, setQueryData] = useState({
    latestEarthDate: "2015-06-05",
    cameras: [],
  });

  // console.log(queryData.latestEarthDate, "DDD");

  const URLQUERY = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverVal}/?&api_key=${process.env.REACT_APP_ROVER2_KEY}`;
  const URLRESULT = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverVal}/photos?earth_date=${queryData.latestEarthDate}&api_key=${process.env.REACT_APP_ROVER2_KEY}`;

  useEffect(() => {
    const fetchRoverQuery = async () => {
      const { data } = await axios.get(URLQUERY);
      let recievedQueryData = data.photo_manifest.photos;
      let latestDateResult = recievedQueryData[recievedQueryData.length - 1];

      setQueryData((queryData) => {
        return {
          ...queryData,
          latestEarthDate: latestDateResult.earth_date,
          cameras: latestDateResult.cameras,
        };
      });
    };

    fetchRoverQuery();
  }, []);

  useEffect(() => {
    const fetchRoverResult = async () => {
      try {
        const { data } = await axios.get(URLRESULT);
        console.log(data, "new D");
        setRoverData((prevState) => {
          return [...prevState, ...data.photos];
        });
      } catch (error) {
        console.error(error, "ERRRR");
      }
    };
    fetchRoverResult();
  }, [queryData.latestEarthDate]);

  const size = 48;
  const renderedRoverData = roverData.slice(0, size).map((photo, index) => {
    return (
      <div key={index}>
        <RoverCard
          // id={photo.id}
          earthDate={photo.earth_date}
          image={photo.img_src}
          camera={photo.camera.name}
        />
      </div>
    );
  });

  const renderedCameras = queryData.cameras.map((cam) => {
    return <option key={cam}>{cam}</option>;
  });

  return (
    <div>
      <div>Mars rover Page</div>
      <select
        name="RoverOpt"
        onChange={(e) =>
          setQueryData({
            latestEarthDate: e.target.value,
          })
        }
        value={roverVal}
      >
        <option value="">Choose a Rover</option>
        <option value="Curiosity">Curiosity</option>
        <option value="Opportunity">Opportunity</option>
        <option value="Spirit">Spirit</option>
      </select>
      <select name="CameraOPt">{renderedCameras}</select>
      <br />
      <input
        type="date"
        value={queryData.latestEarthDate}
        onChange={(e) =>
          setQueryData({
            latestEarthDate: e.target.value,
          })
        }
      />
      <div className="gridContainer">{renderedRoverData}</div>
    </div>
  );
};

export default MarsRover;

//   const [maxDate, setMaxDate] = useState(
//     new Date(new Date().setDate(new Date().getDate() - 3))
//       .toISOString()
//       .slice(0, 10)
//   );

// useEffect(() => {
//     const fetchRover = async () => {
//       const { data } = await axios.get(URL);
//       //   setRoverData(data);
//     };

//     fetchRover();
//   }, []);

//   var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
