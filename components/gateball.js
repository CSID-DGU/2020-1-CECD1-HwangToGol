var leftgate;
var rightgate;
var midgate;
var ball;
var gatePosition;
let removeToast;

var txt2;

function makeBall() {
    ball.body.applyImpulse(
        /* impulse */        new CANNON.Vec3(0, 1, -1),
        /* world position */ new CANNON.Vec3().copy(ball.getAttribute('position'))
    );
}
AFRAME.registerComponent('stick', {
    //Initialization
    init: function () {

    },
    tick: function () {
        if (ball.body === undefined) makeBall();

        // if(ball.body.position.z < gatePosition.z){ //success
        //   txt2.setAttribute("value","success");
        // }
        // if(ball.body.velocity.x == 0){
        //     txt2.setAttribute("value","fail");
        // }

        // if (ball.body.position.z >= gatePosition.z && ball.body.position.x == gatePosition.x) { //성공 시
        //     txt2.setAttribute("value", "if 1 success");
        //     st1success();
        // }

        // if (ball.body.position.z > gatePosition.z && ball.body.position.x < gatePosition.x) { // 1 - gate 보다 왼쪽으로 덜 감 
        //     txt2.setAttribute("value", "if 2 fail");
        //     st1fail();
        // }

        // if (ball.body.position.z > gatePosition.z && ball.body.position.x == gatePosition.x) { // 2 - gate 방향으로 덜 감
        //     txt2.setAttribute("value", "if 3 fail");
        //     st1fail();
        // }

        // if (ball.body.position.z > gatePosition.z && ball.body.position.x > gatePosition.x) { // 3 - gate 보다 오른쪽으로 덜 감
        //     txt2.setAttribute("value", "if 4 fail");
        //     st1fail();
        // }

        // if (ball.body.position.z < gatePosition.z && ball.body.position.x < gatePosition.x) { // 4 - gate 보다 왼쪽으로 더 감 
        //     txt2.setAttribute("value", "if 5 fail");
        //     st1fail();
        // }

        // if (ball.body.position.z < gatePosition.z && ball.body.position.x > gatePosition.x) { // 5 - gate 보다 오른쪽으로 더 감
        //     txt2.setAttribute("value", "if 6 fail");
        //     st1fail();
        // }
    }
});
function toast(string) {
    console.log('toast func');
    const toast = document.getElementById("toast");

    toast.classList.contains("reveal") ?
        (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 3000)) :
        removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 3000)
    toast.classList.add("reveal"),
        toast.innerText = string
}

function st1success() {
    console.log("success func");
    toast("축하합니다~! 성공하셨습니다!");
    location.href = "gamemain.html";

}
function st1fail() {
    console.log("fail test - gateball.js");
    
    ball.body.position = "0 1.3 0";
    // leftgate.body.position = "-1 -2 -10";
    // rightgate.body.position = "1 -2 -10";
    // midgate.body.position = "0 -0.5 -10";

    toast("Fail,,");
    // document.getElementById('gateandball').style.display = 'none';
    // document.getElementById('ball').style.display = 'block';
}

window.onload = function () {
    ball = document.getElementById('ball');

    leftgate = document.getElementById('leftGate');
    rightgate = document.getElementById('rightGate');
    midgate = document.getElementById('middleGate');
    gatePosition = gate.getAttribute('position');

    txt2 = document.getElementById('txt2');
}    