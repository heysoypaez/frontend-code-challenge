import React from "react";
import { sortDesc } from "./utils/sort";
import { capitalize } from "./utils/strings";

const Pokemon = ({
  pokemon: { Number: Id, Name, Types, img, MaxCP },
  nameSearched,
}) => (
  <li key={Id}>
    <img src={img} alt={Name} />
    <div className="info">
      <h1>
        {nameSearched && Name.toLowerCase().match(`^${nameSearched}.*`) ? (
          <>
            <span className="hl">{capitalize(nameSearched)}</span>
            {Name.toLowerCase().replace(nameSearched, "")}
          </>
        ) : (
          <>{Name}</>
        )}
      </h1>
      <p>MaxCP: {MaxCP}</p>
      {Types.sort(sortDesc).map((type) => (
        <span className={`type ${type}`}>{type}</span>
      ))}
    </div>
  </li>
);

export default Pokemon;
