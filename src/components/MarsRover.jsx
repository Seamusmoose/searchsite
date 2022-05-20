import React, { useState, useEffect } from "react";
import axios from "axios";
import RoverCard from "./RoverCard";

const MarsRover = () => {
  const [queryData, setQueryData] = useState({
    earthDate: "",
    cameras: [],
  });
  const [roverData, setRoverData] = useState([]);

  const rover = "curiosity";
  const URL = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.REACT_APP_ROVER_KEY}`;

  useEffect(() => {
      
    const fetchRoverQuery = async () => {
      const { data } = await axios.get(URL);
      let recievedQueryData = data.photo_manifest.photos;
      let resultQueryData = recievedQueryData[recievedQueryData.length - 1];
      setQueryData((queryData) => {
        return {
          ...queryData,
          earthDate: resultQueryData.earth_date,
          cameras: resultQueryData.cameras,
        };
      });
    };

    const fetchRover = async () => {
      const { data } = await axios.get(URL);
      //   setRoverData(data);
    };

     fetchRoverQuery();
     fetchRover()
  }, []);

  console.log(queryData);

  //   const renderedRoverData = roverData.photos.map((photo) => {
  //     console.log(photo);
  //     return (
  //       <RoverCard
  //         key={photo.id}
  //         earthDate={photo.earth_date}
  //         // id={photo.id}
  //         image={photo.img_src}
  //       />
  //     );
  //   });

  return <div>{/* <div>{renderedRoverData}</div> */}</div>;
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
