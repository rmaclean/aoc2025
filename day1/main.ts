const day = '1'
const data = await Deno.readTextFile(`./day${day}/data.txt`);

const lineParser = /(?<left>\d+)\s+(?<right>\d+)/

const leftNumbers: number[] = [];
const rightNumbers: number[] = [];
data.split('\n').forEach((line) => {
  const parsedLine = lineParser.exec(line)

  const left = parsedLine?.groups?.["left"];
  if (left) {
    leftNumbers.push(+left);
  }

  const right = parsedLine?.groups?.["right"];
  if (right) {
    rightNumbers.push(+right);
  }
});

const part1 = () => {
  leftNumbers.sort();
  rightNumbers.sort();

  let totalDistance = 0;

  for (let index = 0; index < leftNumbers.length; index++) {
    const left = leftNumbers[index];
    const right = rightNumbers[index];

    const diff = Math.max(left, right) - Math.min(left, right);
    totalDistance += diff;
  }

  console.log(totalDistance);
}

const part2 = () => {
  let similarity = 0;

  const knowns: Record<number, number> = {};

  for (const number of leftNumbers) {
    if (knowns[number]) {
      similarity += knowns[number];
      continue;
    }

    const count = rightNumbers.filter(i => i === number).length;
    const value = number * count;
    similarity += value;
    knowns[number] = value;
  }

  console.log(similarity)
}

part2();