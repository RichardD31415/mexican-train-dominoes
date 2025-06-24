import Dominoe from "./src/Dominoe/Dominoe.ts";

const dominoeMaxFaceValue: number = 12;
const dominoeMinFaceValue: number = 0;

const allDominoes: Dominoe[] = [];

for (let faceA = dominoeMinFaceValue; faceA <= dominoeMaxFaceValue; faceA++) {
  for (let faceB = faceA; faceB <= dominoeMaxFaceValue; faceB++) {
    allDominoes.push(new Dominoe(faceA, faceB));
  }
}

console.log("All Dominoes:");
allDominoes.forEach((dominoe) => {
  console.log(dominoe.toString());
});
console.log(`Total Dominoes: ${allDominoes.length}`);
