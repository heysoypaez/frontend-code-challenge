import React from "react";

const Pokemon = ({ pokemon: { Number: Id, Name, Types, img } }) => (
  <li key={Id}>
    <img src={img} alt={Name} />
    <div className="info">
      <h1>{Name}</h1>
      {Types.map((type) => (
        <span className={`type ${type}`} key={Id}>
          {type}
        </span>
      ))}
    </div>
  </li>
);

export default Pokemon;
