var shallThrow = false;
var hasThrown = false;
var ball;
var lastPosition = new CANNON.Vec3(0, 0, 0);
var currentPosition = new CANNON.Vec3(0, 0, 0);
var hasPrepared = false;
var ctlL;
var ctlR;

function throwBall(delta) {
    hasThrown = true;
    hasPrepared = false;
    let velocity = currentPosition.vsub(lastPosition).scale(1/delta);
    ball.body.applyLocalImpulse(velocity.scale(50), new CANNON.Vec3(0, 0, 0));
}

console.log("main.js");

AFRAME.registerComponent('throwing-hand', {
   
    dependencies:['dynamic-body','laser-controls'],
    init: function () {
        this.el.txt = document.getElementById("txt");
          this.el.txt2 = document.getElementById("txt2");
         
          //Stick Moved
          this.el.addEventListener('axismove',function(event){
            
            this.txt.setAttribute("value", "Stick  x:"+event.detail.axis[0].toFixed(2)+", y:"+event.detail.axis[1].toFixed(2));
            hasThrown = false;
            hasPrepared = false;
            shallThrow = false;
            lastPosition = new CANNON.Vec3(0, 0, 0);
            currentPosition = new CANNON.Vec3(0, 0, 0);
       
          }); 
        this.el.addEventListener('triggerdown', function (e) {
            hasPrepared = true;
            console.log('triggerdown');
        });
        this.el.addEventListener('triggerup', function (e) {
            if (!hasThrown && hasPrepared) { shallThrow = true};
            console.log('triggerup');
        });
        this.el.addEventListener('trackpadtouchstart', function (e) { // restart
            hasThrown = false;
            hasPrepared = false;
            shallThrow = false;
            lastPosition = new CANNON.Vec3(0, 0, 0);
            currentPosition = new CANNON.Vec3(0, 0, 0);
        });

    },
    tick: function (uptime, delta) {
        //let position = this.el.getElementById('ctlR');
        let position = this.el.object3D.position;
        //var position = ctlR.object3D.position;
        this.el.txt2.setAttribute("value","Controller_Point: "+ "X =" + position.x.toFixed(2)+", Y ="+position.y.toFixed(2));
        
        if (!hasThrown && ball && ball.body) {
            ball.body.velocity.set(0, 0, 0);
            ball.body.angularVelocity.set(0, 0, 0);
            ball.body.quaternion.set(0, 0, 0, 1);
            ball.body.position.set(position.x, position.y, position.z);
        }

        if (shallThrow && ball && ball.body) {
            shallThrow = false;
            currentPosition.copy(position);
            throwBall(delta / 1000.0);
        }

        lastPosition.copy(position);
    
    }
});

window.onload = function () {
    ball = document.getElementById('ball');
    
    ctlR = document.getElementById('ctlR');
    ctlL = document.getElementById('ctlL');
    // make the ball not bounce when colliding with the ground or the bumpers
    //

    let world = document.querySelector('a-scene').systems['physics'].world;
    let groundMaterial = document.querySelector('[static-body]').body.material;
    let laneObjects = document.querySelectorAll(['static-body']);
    for (let i = 0; i < laneObjects.length; i++) {
        laneObjects[i].body.material = groundMaterial;
    }

    // create a contact material: ball vs ground/bumpers
    let contactMaterial = new CANNON.ContactMaterial(
        groundMaterial, ball.body.material, { restitution: 0.001 });
    world.addContactMaterial(contactMaterial);
};
