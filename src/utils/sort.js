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
}

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
}


export {sortByName, sortByType}