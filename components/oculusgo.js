var shallThrow = false;
var hasThrown = false;
var ball;
var lastPosition = new CANNON.Vec3(0, 0, 0);
var currentPosition = new CANNON.Vec3(0, 0, 0);
var hasPrepared = false;

AFRAME.registerComponent('input-listener', {
    schema: { 
      hand: {
        type: "string",
        default: ""
      }
    },
    //Initialization
    init:function () {
      this.el.txt = document.getElementById("txt");
      this.el.txt2 = document.getElementById("txt2");
      //Stick Moved
      this.el.addEventListener('axismove',function(event){
        this.txt.setAttribute("value", "Stick  x:"+event.detail.axis[0].toFixed(2)+", y:"+event.detail.axis[1].toFixed(2));
      }); 
     
    },
    tick: function (uptime, delta) {
      if(this.data.hand=="right"){
        var position=this.el.object3D.position;

        ball.body.applyLocalImpulse( new CANNON.Vec3(0, 0, 0), new CANNON.Vec3(0, 0, 0));
    
        //ball.body.velocity.set(0, 0, 0);
        //    ball.body.angularVelocity.set(0, 0, 0);
        //    ball.body.quaternion.set(0, 0, 0, 1);
            ball.body.position.set(position.x, 0.0, position.z);
        //    let velocity = currentPosition.vsub(lastPosition).scale(1/delta);
        //    ball.body.applyLocalImpulse(velocity.scale(50), new CANNON.Vec3(0, 0, 0));
    
        this.el.txt2.setAttribute("value","Controller_Point: "+ "X =" + position.x.toFixed(2)+", Y ="+position.y.toFixed(2));
      }
    }
});


window.onload = function () {
    ball = document.getElementById('ball');
}    