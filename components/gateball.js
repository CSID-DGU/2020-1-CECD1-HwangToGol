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

        // if(ball.body.position.z < gatePosition.z){ //success
        //   txt2.setAttribute("value","success");
        // }
        // if(ball.body.velocity.x == 0){
        //     txt2.setAttribute("value","fail");
        // }

        if(ball.body.position.z >= gatePosition.z && ball.body.position.x == gatePosition.x){ //성공 시
            txt2.setAttribute("value", "if 1 success");
            st1success();
        }

        if(ball.body.position.z > gatePosition.z && ball.body.position.x < gatePosition.x){ // 1 - gate 보다 왼쪽으로 덜 감 
            txt2.setAttribute("value", "if 2 fail");
            st1fail();
        }
        
        if(ball.body.position.z > gatePosition.z && ball.body.position.x == gatePosition.x){ // 2 - gate 방향으로 덜 감
            txt2.setAttribute("value", "if 3 fail");
            st1fail();
        }

        if(ball.body.position.z > gatePosition.z && ball.body.position.x > gatePosition.x){ // 3 - gate 보다 오른쪽으로 덜 감
            txt2.setAttribute("value", "if 4 fail");
            st1fail();
        }

        if(ball.body.position.z < gatePosition.z && ball.body.position.x < gatePosition.x){ // 4 - gate 보다 왼쪽으로 더 감 
            txt2.setAttribute("value", "if 5 fail");
            st1fail();
        }
        
        if(ball.body.position.z < gatePosition.z && ball.body.position.x > gatePosition.x){ // 5 - gate 보다 오른쪽으로 더 감
            txt2.setAttribute("value", "if 6 fail");
            st1fail();
        }
    }
  });

  window.onload = function () {
      ball = document.getElementById('ball');
      gate = document.getElementById('gate');
      gatePosition = gate.getAttribute('position');
     
      txt2 = document.getElementById('txt2');
  }    