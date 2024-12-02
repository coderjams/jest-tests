export const range = (start: number, end: number): number[] => {
  return [...Array(end - start).keys()].map((el) => el + start);
};
console.log('utils', range(1, 5)); // [1, 2, 3, 4]

export const pluck = (elements: any[], field: string) => {
  return elements.map((el) => el[field]);
};
