// source: https://stackoverflow.com/a/59221545/13267067

const findSimilar = (arrays) => {
  return arrays.reduce((includ, current) =>
    Array.from(new Set(includ.filter((a) => current.includes(a))))
  );
};

export default findSimilar;
