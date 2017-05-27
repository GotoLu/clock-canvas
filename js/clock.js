var clk = document.getElementById('clock');
var clktx = clk.getContext('2d');

var width = clk.width;
var height = clk.height;
var r = width/2;
var rem = width / 200;

function drawBackGround(){
    clktx.save();
    clktx.translate(r,r);
    clktx.beginPath();
    clktx.lineWidth = 10 * rem;
    clktx.arc(0, 0, r - clktx.lineWidth / 2, 0, 2*Math.PI, false);
    clktx.stroke();

    clktx.textAlign = "center";
    clktx.textBaseline = "middle";
    clktx.font = 18 * rem + "px Arial"
    var hourNums = [3,4,5,6,7,8,9,10,11,12,1,2];
    hourNums.forEach(function(num,i){
        var arc = 2 * Math.PI / 12 * i;
        var x = (r - 25 * rem) * Math.cos(arc);
        var y = (r - 25 * rem) * Math.sin(arc);

        clktx.fillText(num,x,y);
    })

    for(var i = 0; i < 60; ++i){
        var arc = 2 * Math.PI / 60 * i;
        var x = (r - 13 * rem) * Math.cos(arc);
        var y = (r - 15 * rem) * Math.sin(arc);

        clktx.beginPath();
        if(i % 5 === 0){
            clktx.fillStyle = '#000';
            clktx.arc(x,y,2 * rem,0,2*Math.PI,false);
        }else{
            clktx.fillStyle = '#ccc';
            clktx.arc(x,y,2 * rem,0,2*Math.PI,false);
        }

        clktx.fill();
    }
}

function drawHour(hour,min){
    clktx.save()
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * min;
    clktx.beginPath();
    clktx.lineCap = 'round';
    clktx.rotate(rad + mrad);
    clktx.lineWidth = 8 * rem;
    clktx.moveTo(0, 8 * rem);
    clktx.lineTo(0, -r/2);
    clktx.stroke();
    clktx.restore();
}

function drawMin(min,sec){
    clktx.save()
    var rad = 2 * Math.PI / 60 * min;
    var srad = 2 * Math.PI / 60 /60 * sec;
    clktx.beginPath();
    clktx.lineCap = 'round';
    clktx.rotate(rad + srad);
    clktx.lineWidth = 6 * rem;
    clktx.moveTo(0, 8 * rem);
    clktx.lineTo(0, -r/2 - 20 * rem);
    clktx.stroke();
    clktx.restore();
}

function drawSec(sec){
    clktx.save()
    var rad = 2 * Math.PI / 60 * sec;
    clktx.beginPath();
    clktx.rotate(rad);
    clktx.fillStyle = 'red';
    clktx.moveTo(-2, 18 * rem);
    clktx.lineTo(2, 18 * rem);
    clktx.lineTo(1, -r/2 - 30 * rem);
    clktx.lineTo(-1, -r/2 - 30 * rem);
    clktx.fill();
    clktx.restore();
}

function Dot(){
    clktx.beginPath();
    clktx.fillStyle = 'white';
    clktx.arc(0, 0, 4, 0, 2*Math.PI, false);
    clktx.fill();
}

draw();

function draw(){
    clktx.clearRect(0,0,width,height);
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    drawBackGround();
    drawHour(hour, min);
    drawMin(min, sec);
    drawSec(sec);
    Dot();

    clktx.font = "36px, Arial";
    clktx.fillStyle = 'black';
    clktx.textAlign = 'center';
    clktx.fillText("小兔兔么么哒", 0, -40);
    clktx.restore();
}

setInterval(draw, 1000);