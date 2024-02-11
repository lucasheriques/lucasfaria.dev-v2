export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const DEFAULT_COLOR = "hsl(50deg, 100%, 50%)";

export const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (!end) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end!; i += step) {
    output.push(i);
  }
  return output;
};

export const generateSparkle = (color = DEFAULT_COLOR) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    // Bright yellow color:
    color,
    size: random(10, 20),
    style: {
      // Pick a random spot in the available space
      top: random(0, 80) + "%",
      left: random(0, 100) + "%",
      // Float sparkles above sibling content
      zIndex: 10,
    },
  };
};
