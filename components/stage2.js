var leftgate;
var rightgate;
var midgate;
var ball;
var gatePosition;
let removeToast;
var chance = 0;

var txt2;
var distance;

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
        while (ball === undefined) {}
        if(ball.body === undefined) makeBall();

        distance = ball.body.position.distanceTo(midgatePosition).toFixed(2);

        var firsttimer = setTimeout(function () {
            //console.log("chance : ", chance);
            if (chance == 0) {
                if (ball.body.position.z < midgatePosition.z && 
                    (ball.body.position.x < 1 && ball.body.position.x > -1)) { //success
                    st1success();
                }

                if(ball.body.position.z > midgatePosition.z) { //gate 까지 가지 못했을 때
                    if(ball.body.position.x < 1 && ball.body.position.x > -1){
                        st1fail("조금 세게 쳐보세요! 마지막 기회가 제공됩니다.");
                    }
                    if(ball.body.position.x < -1){
                        st1fail("조금 더 오른쪽으로 세게 쳐보세요! 마지막 기회가 제공됩니다.");
                    }
                    if(ball.body.position.x > 1){
                        st1fail("조금 더 왼쪽으로 세게 쳐보세요! 마지막 기회가 제공됩니다.");
                    }
                }
                
                if(ball.body.position.z < midgatePosition.z) {  //gate 넘어감 but 방향 다름
                    if(ball.body.position.x < -1){ // gate 왼쪽으로 
                        st1fail("조금 더 오른쪽으로 쳐보세요! 마지막 기회가 제공됩니다.");
                    }
                    if(ball.body.position.x > 1){  //gate 오른쪽으로
                        st1fail("조금 더 왼쪽으로 쳐보세요! 마지막 기회가 제공됩니다.");
                    }
                }
                chance += 1;
                clearTimeout(firsttimer);
            }
        }, 15000);

        if(chance == 1){
            var secondtimer = setTimeout(function() {
                //console.log("chance : ", chance);
                if(chance == 1){  //두번재 기회
                    if (ball.body.position.z < midgatePosition.z && 
                        (ball.body.position.x < 1 && ball.body.position.x > -1)) { //success
                        st1success();
                    }else{
                        toast('#real_fail');
                        var failAudio = document.getElementById('fail_audio');
                        failAudio.play();
                        setTimeout("location.href='gamemain.html'", 3000);
                    }
                    chance += 1;
                    clearTimeout(secondtimer);
                }
    
            }, 18000);
        }
    }
});
function toast(string) {
    //console.log('toast func', string);
    const toast = document.getElementById("toast");
    var solutionImg = document.getElementById("solutionImg");
    solutionImg.setAttribute("src",string);
    solutionImg.setAttribute("visible",true);

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
   // console.log("st1success");
    //toast("축하합니다~! 성공하셨습니다!");
    toast("#success");
    var successAudio = document.getElementById('success_audio');
    successAudio.play();
    setTimeout("location.href='gamemain.html'", 3000);
}

function st1fail(failmsg) {
    //console.log(failmsg);
    ball.body.position.x = 0;
    ball.body.position.y = -0.25;
    ball.body.position.z = 0;
    
    var failaudio;
    var distanceArea = document.getElementById('distance');

    if(failmsg == '조금 세게 쳐보세요! 마지막 기회가 제공됩니다.'){
        failaudio = document.getElementById('less_power_audio');
        //console.log(failaudio);
        failaudio.play();
        toast("#fail_power");
        distanceArea.setAttribute("value",distance+" m");
    }
    if(failmsg == '조금 더 오른쪽으로 세게 쳐보세요! 마지막 기회가 제공됩니다.'){
        failaudio = document.getElementById('right_less_power_audio');
        failaudio.play();
        toast("#fail_right_power");
        distanceArea.setAttribute("value",distance+" m");
    }
    if(failmsg == '조금 더 왼쪽으로 세게 쳐보세요! 마지막 기회가 제공됩니다.'){
        failaudio = document.getElementById('left_less_power_audio');
        failaudio.play();
        toast("#fail_left_power");
        distanceArea.setAttribute("value",distance+" m");
    }
    if(failmsg == '조금 더 오른쪽으로 쳐보세요! 마지막 기회가 제공됩니다.'){
        failaudio = document.getElementById('right_enough_power_audio');
        failaudio.play();
        toast("#fail_right");
        distanceArea.setAttribute("value",distance+" m");
    }
    if(failmsg == '조금 더 왼쪽으로 쳐보세요! 마지막 기회가 제공됩니다.'){
        failaudio = document.getElementById('left_enough_power_audio');
        failaudio.play();
        toast("#fail_left");
        distanceArea.setAttribute("value",distance+" m");
    }

}

window.onload = function () {
    ball = document.getElementById('ball');

    leftgate = document.getElementById('leftGate');
    rightgate = document.getElementById('rightGate');
    midgate = document.getElementById('middleGate');
    midgatePosition = midgate.getAttribute('position');

    txt2 = document.getElementById('txt2');
}    
