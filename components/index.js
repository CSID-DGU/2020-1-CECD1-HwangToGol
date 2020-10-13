console.log("index.js - 1");
const body = document.querySelector('a-scene');
const $ = (query) => body.querySelector(query);


const animate = () => {

  const variation = Math.sin(Date.now() / 100); //how many milliseconds pass

  let curPosition = $('#ball').getAttribute('position'); //ball's current position
  
  curPosition.x -= variation;
  curPosition.z -= variation;

  $('#ball').setAttribute('position',curPosition);
  $('#gate').setAttribute('position', curPosition);

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);