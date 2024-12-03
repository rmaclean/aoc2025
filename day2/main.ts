const day = '2'
const data = await Deno.readTextFile(`./day${day}/data.txt`);

const reports = data.split('\n').map((line) => {
  return line.split(' ').map((digit) => +digit);
});

enum Direction {
  increasing,
  decreasing,
  flat,
}

const determineDirection = (a: number, b: number) => {
  if (a === b) {
    return Direction.flat;
  }

  return a < b ? Direction.increasing : Direction.decreasing;
}

const positiveSubtract = (a: number, b: number) => {
  return Math.max(a, b) - Math.min(a, b);
}

const safeReport = (report: number[], depth = 0) => {
  const direction = determineDirection(report[0], report[1]);
  const problemAt = [];

  if (direction === Direction.flat) {
    problemAt.push(0);
  }

  for (let index = 0; index < report.length - 1; index++) {
    const a = report[index];
    const b = report[index + 1];

    const continuingDirection = determineDirection(a, b);

    if (continuingDirection === Direction.flat) {
      problemAt.push(index);
      continue;
    }

    if (continuingDirection !== direction) {
      if (index > 0) {
        problemAt.push(index - 1);
      }

      problemAt.push(index);
      problemAt.push(index + 1);
      continue;
    }

    const diff = positiveSubtract(a, b);
    if (diff > 3 || diff < 1) {
      problemAt.push(index);
      problemAt.push(index + 1);
      continue;
    }
  }

  // console.log(report, problemAt, depth)

  if (problemAt.length > 0 && depth === 0) {
    for (const problemElement of problemAt) {
      const modified = report.toSpliced(problemElement, 1);
      const result = safeReport(modified, 1);
      if (result) {
        return true;
      }
    }
  }

  return problemAt.length === 0;
}

const part1 = () => {
  console.log(reports.map(r => safeReport(r)));
}

const part2 = () => {
  // console.log(safeReport(reports[24]), reports[24])
  console.log(reports.map((r,i) => `${i+ 1}\t${safeReport(r)}\t${r}`).join('\n'))
  console.log(reports.filter(r => safeReport(r)).length);

}

part2();