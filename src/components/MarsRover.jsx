import React, { useState, useEffect } from "react";
import axios from "axios";
import RoverCard from "./RoverCard";
import "../rover.css";

const camerasList = [
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
  "PANCAM",
  "MINITES",
];
const currentRovers = ["Curiosity", "Opportunity", "Spirit"];
const date = new Date().toISOString().slice(0, 10);

const MarsRover = () => {
  const [roverData, setRoverData] = useState([]);
  const [roverVal, setRoverVal] = useState("Curiosity");
  const [queryData, setQueryData] = useState({
    latestEarthDate: date,
    cameras: [camerasList],
  });

  const URLQUERY = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverVal}/?&api_key=${process.env.REACT_APP_ROVER2_KEY}`;
  const URLRESULT = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverVal}/photos?earth_date=${queryData.latestEarthDate}&api_key=${process.env.REACT_APP_ROVER2_KEY}`;

  useEffect(() => {
    const fetchRoverQueryOnMount = async () => {
      const { data } = await axios.get(URLQUERY);
      let recievedQueryData = data.photo_manifest.photos;
      let latestDateResult = recievedQueryData[recievedQueryData.length - 1];
      // console.log(latestDateResult.cameras, "latestcam");
      setQueryData((queryData) => {
        return {
          ...queryData,
          latestEarthDate: latestDateResult.earth_date,
          cameras: latestDateResult.cameras,
        };
      });
    };

    fetchRoverQueryOnMount();
  }, []);

  useEffect(() => {
    const fetchRoverResult = async () => {
      const { data } = await axios.get(URLRESULT);
      const camerasQueryResult = data.photos.map((i) => {
        return i.camera.name;
      });
      let uniqueCameras = [...new Set(camerasQueryResult)];

      setQueryData((prevVal) => {
        return {
          ...prevVal,
          cameras: [...uniqueCameras],
        };
      });
      setRoverData([]);
      setRoverData((prevState) => {
        return [...prevState, ...data.photos];
      });
    };

    fetchRoverResult();
  }, [queryData.latestEarthDate, roverVal]);

  const handleDateChange = (e) => {
    setQueryData((prevState) => {
      return {
        ...prevState,
        latestEarthDate: e.target.value,
      };
    });
  };

  const size = 48;
  const renderedRoverData = roverData.slice(0, size).map((photo, index) => {
    return (
      <div key={index}>
        <RoverCard
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

  console.log(queryData.cameras, "camsssssxs");

  const renderedRovers = currentRovers.map((rover) => {
    return <option key={rover}>{rover}</option>;
  });

  const RoverDateSelectorMin = () => {
    switch (roverVal) {
      case "Curiosity":
        return "2012-08-06";
      case "Opportunity":
        return "2004-01-26";
      case "Spirit":
        return "2004-01-05";
      default:
        return "2012-08-06";
    }
  };
  const RoverDateSelectorMax = () => {
    switch (roverVal) {
      case "Curiosity":
        return queryData.latestEarthDate;
      case "Opportunity":
        return "2018-06-11";
      case "Spirit":
        return "2010-03-22";
      default:
        return queryData.latestEarthDate;
    }
  };

  return (
    <div>
      <div>Mars rover Page</div>
      <select
        name="RoverOpt"
        onChange={(e) => setRoverVal(e.target.value)}
        value={roverVal}
      >
        {renderedRovers}
      </select>

      <select name="CameraOPt" value={queryData.cameras}>
        {renderedCameras}
      </select>
      <br />
      <input
        name="date"
        type="date"
        min={RoverDateSelectorMin(roverVal)}
        max={RoverDateSelectorMax(roverVal)}
        value={queryData.latestEarthDate}
        onChange={handleDateChange}
      />
      <div className="gridContainer">{renderedRoverData}</div>
    </div>
  );
};

export default MarsRover;
