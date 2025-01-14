export function randomFloatRange(min, max) {
  return min + Math.random() * (max - min + 1);
}

export function randomIntegerRange(min, max) {
  return Math.floor(randomFloatRange(min, max));
}

export function getRandomized(array) {
  let arrayCopy = [...array];
  const output = [];
  while (arrayCopy.length >= 1) {
    const i = Math.floor(Math.random() * arrayCopy.length);
    output.push(arrayCopy[i]);
    arrayCopy.splice(i, 1);
  }
  return output;
}
