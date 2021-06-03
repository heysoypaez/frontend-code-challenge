import React from "react";

const Pokemon = ({
  pokemon: { Number: Id, Name, Types, img },
  nameSearched,
}) => (
  <li key={Id}>
    <img src={img} alt={Name} />
    <div className="info">
      <h1>
        {
          nameSearched && Name.match(`^${nameSearched}.*`) ? 
          <><span className="hl">{nameSearched}</span>{Name.replace(nameSearched,"")}</>
          : <>{Name}</>
        }
      </h1>
      {Types.map((type) => (
        <span className={`type ${type}`} >
          {type}
        </span>
      ))}
    </div>
  </li>
);

export default Pokemon;
