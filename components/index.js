const body = document.querySelector('a-scene');
const $ = (query) => body.querySelector(query);

const shiftDegrees = (value) => (value + 1) % 360;

let degrees = 0;

console.log($('#ball'))

const animate = () => {
  degrees = shiftDegrees(degrees);
  const color = `hsl(${degrees}, 100%, 50%)`;
  const variation = Math.sin(Date.now() / 1000); //how many milliseconds pass
  //const position = `0 ${1.5 + variation} ${-4 + variation} `; //change y-value

  $('#ball').setAttribute('color', color);
  $('#ball').setAttribute('position',position);

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);