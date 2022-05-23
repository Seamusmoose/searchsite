import React from "react";

const RoverCard = (props) => {
  return (
    <>
      <h3>{props.earthDate}</h3>
      <h3>{props.id}</h3>
      <h4>{props.camera}</h4>
      <img className="gridImage" src={props.image} />
    </>
  );
};

export default RoverCard;
