import React, { useState, useEffect } from "react";
import axios from "axios";
import RoverCard from "./RoverCard";

const rover = ["Curiosity", "Opportunity", "Spirit"];

const MarsRover = () => {
  const [roverData, setRoverData] = useState([]);
  const [roverVal, setRoverVal] = useState(rover[0]);
  const [queryData, setQueryData] = useState({
    latestEarthDate: "2015-06-05",
    cameras: [],
  });

  const roverDefault = "Curiosity";
  const URLQUERY = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverDefault}/?api_key=${process.env.REACT_APP_ROVER_KEY}`;
  const URLRESULT = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverDefault}/photos?earth_date=${queryData.latestEarthDate}&api_key=${process.env.REACT_APP_ROVER_KEY}`;

  useEffect(() => {
    const fetchRoverQuery = async () => {
      const { data } = await axios.get(URLQUERY);
      let maxDate = data.photo_manifest.max_date;
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

    const fetchRoverResult = async () => {
      try {
        const { data } = await axios.get(URLRESULT);
        // console.log(data.photos, "DATA HERE");
        setRoverData((prevState) => {
          return [...prevState, ...data.photos];
        });
      } catch (error) {
        console.error(error, "ERR");
      }
    };

    fetchRoverQuery();
    fetchRoverResult();
  }, [roverData]);

  //console.log(roverData, "rovers datas");

  const renderedRoverData = roverData.map((photo, index) => {
    console.log(photo);
    return (
      <RoverCard
        key={index}
        earthDate={photo.earth_date}
        // id={photo.id}
        image={photo.img_src}
      />
    );
  });

  return (
    <div>
      <div>Mars rover Page</div>
      <select
        name="RoverOpt"
        onChange={(e) => setRoverVal(e.target.value)}
        value={roverVal}
      >
        <option value="">Choose a Rover</option>
        <option value="Curiosity">Curiosity</option>
        <option value="Opportunity">Opportunity</option>
        <option value="Spirit">Spirit</option>
      </select>
      <select name="CameraOPt">
        <option value="">Choose a Camera</option>
        <option value="CHEMCAM">CHEMCAM</option>
        <option value="MAHLI">MAHLI</option>
      </select>
      <br />
      <select name="DateOpt">
        <option value="">Choose an available date</option>
        <option value="">test</option>
        <option value="">test2</option>
      </select>
      <div>{renderedRoverData ? renderedRoverData : <div>Loadng....</div>}</div>
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
