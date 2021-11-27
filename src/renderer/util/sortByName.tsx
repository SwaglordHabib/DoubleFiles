export const sortByName = <T extends { name: string }>(
  a: T,
  b: T
): 1 | -1 | 0 => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
