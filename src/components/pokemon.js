import React from "react";
import PropTypes from "prop-types";

import { sortDesc } from "../utils/sort";
import { capitalize } from "../utils/strings";

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
      {Types.sort(sortDesc).map((type,i) => (
        <span className={`type ${type}`} key={i}>{type}</span>
      ))}
    </div>
  </li>
);

Pokemon.propTypes = {
  nameSearched: PropTypes.string,
  pokemon: PropTypes.shape({
    Number:PropTypes.string.isRequired,
    Name:PropTypes.string.isRequired,
    Types:PropTypes.arrayOf(PropTypes.string),
    img:PropTypes.string,
    MaxCP:PropTypes.number,  
  })
}

export default Pokemon;
