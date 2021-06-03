const sortDesc = (first, second) =>
  first < second ? -1 : first > second ? 1 : 0;

const sortByName = (first, second) => {
  const firstName = first.Name.toLowerCase();
  const secondName = second.Name.toLowerCase();
  return sortDesc(firstName, secondName);
};

const sortByMaxCp = (first, second) => {
  const firstMaxCP = first?.MaxCP;
  const secondMaxCP = second?.MaxCP;
  return secondMaxCP > firstMaxCP
    ? 1
    : secondMaxCP === firstMaxCP
    ? 0
    : secondMaxCP < firstMaxCP
    ? -1
    : 2;
};

export { sortByName, sortDesc, sortByMaxCp };
