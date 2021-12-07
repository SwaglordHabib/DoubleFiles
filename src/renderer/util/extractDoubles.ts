export const extractDoubles = <T extends { name: string }>(arr: T[]) => {
  const doubles = [
    ...new Set(
      arr
        .map((element) => element.name)
        .filter((item, index, iteratee) => iteratee.indexOf(item) !== index)
    ),
  ];

  const flattenedDoubles = doubles
    .map((element) => arr.filter((item) => item.name === element))
    .flat();

  return flattenedDoubles;
};
