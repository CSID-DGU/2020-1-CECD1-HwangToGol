var gate;
var ball;
var gatePosition;

var txt2;

function makeBall(){
    ball.body.applyLocalImpulse( new CANNON.Vec3(0, 0, 0), new CANNON.Vec3(0, 0, 0));
}

AFRAME.registerComponent('gateball', {
    //Initialization
    init:function () {
    },
    tick: function () {
        if(gate.body === undefined) makeBall();

        if(ball.body.position.z < gatePosition.z){ //success
          txt2.setAttribute("value","success");
        }
        if(ball.body.velocity.x == 0){
            txt2.setAttribute("value","fail");
        }
        
    }
  });

  window.onload = function () {
      ball = document.getElementById('ball');
      gate = document.getElementById('gate');
      gatePosition = gate.getAttribute('position');
     
      txt2 = document.getElementById('txt2');
  }    