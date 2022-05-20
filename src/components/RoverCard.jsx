import React from "react";
import "../rover.css";

const RoverCard = (props) => {
  return (
    <div>
      <h1>{props.earthDate}</h1>
      <h1>{props.id}</h1>
      <img className="roverImg" src={props.image} />
    </div>
  );
};

export default RoverCard;
