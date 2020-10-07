
AFRAME.registerComponent('ball', {  //component의 속성 정의
    schema: {
        name : {default : 'ball0' },
        color : { default : '#0054FF'},
        size : { type : 'int', default : 10},
    },                    

    init: function () {     //component가 처음 초기화될 때 호출
        console.log("log 확인 : ", this.id);
    },
    update: function () {},        //component가 처음 초기화될때, component의 속성이 변경될 때 호출 : entity 수정할 때 사용
    tick: function () {},          //render loop가 호출될 때 마다 호출  : 계속되는 변화를 체크할 때 사용 
    remove: function () {},        //component가 entity에서 제거될때, scene에서 분리될 때 호출 : 이전에 있던 entity에 대한 모든 수정사항을 취소할때 사용 
    pause: function () {},         //component가 entity에서 제거 혹은 entity가 scene에서 분리될 때 : scene이나 entity가 정지할 때 호출됨.
    play: function () {}           //scene이나 entity가 작동될때, component가 초기화될 때 한번 호출됨. : 행동을 시작하거나 계속할 때 사용
});