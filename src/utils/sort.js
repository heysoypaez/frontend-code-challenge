const sortByName = (first, second) => {
  const firstName = first.Name.toUpperCase();
  const secondName = second.Name.toUpperCase();
  if (firstName < secondName) {
    return -1;
  }
  if (firstName > secondName) {
    return 1;
  }
  return 0;
};

const sortByType = (first, second) => {
  const firstName = first.Name.toUpperCase();
  const secondName = second.Name.toUpperCase();
  if (firstName < secondName) {
    return -1;
  }
  if (firstName > secondName) {
    return 1;
  }
  return 0;
};

const sortByMaxCp = (first, second) => {
  const firstMaxCP = first?.MaxCP;
  const secondMaxCP = second?.MaxCP;
  if (secondMaxCP > firstMaxCP) {
    return 1;
  } else if (secondMaxCP === firstMaxCP) {
    return 0;
  } else if (secondMaxCP < firstMaxCP) {
    return -1;
  }
  return 1;
};

export { sortByName, sortByType, sortByMaxCp };
