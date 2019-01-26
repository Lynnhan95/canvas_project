var canvas1 = document.getElementById('canvas1')

function setSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight 
    canvas1.width = pageWidth
    canvas1.height = pageHeight
}
setSize();

window.onresize = function(){
    setSize();
}

var ctx = canvas1.getContext('2d')
var paint = false;
var using = false;
var lastPoint = {x: undefined, y: undefined}
console.log(using)
canvas1.onmousedown = function(eee){
    var x = eee.clientX;
    var y = eee.clientY;
    if(eraserEnabled){
        using =true;
        ctx.clearRect(x-5, y-5, 10, 10)
    }else{
        paint = true;
        lastPoint = {'x':x, 'y':y }
    }
    console.log(using)
}

// //move a mouse
canvas1.onmousemove = function(kkk){
    var x = kkk.clientX;
    var y = kkk.clientY;
    if(eraserEnabled){
        if(using){
            ctx.clearRect(x, y, 10, 10)
        }
        
    }else{
        if(paint){
            var newPoint = {'x':x, 'y':y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint //key !!s
        }
    }

}

//release a mouse
canvas1.onmouseup = function(uuu){
    paint = false;
    console.log(uuu)
}

//function drawline
function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.moveTo(x1,y1)   //start point
    ctx.lineWidth = 5
    ctx.lineTo(x2,y2)   //end point
    ctx.stroke()
    ctx.closePath()
}

var eraserEnabled = false;
var actions = document.getElementById('actions')
var eraser = document.getElementById('eraser')
var brush = document.getElementById('brush')
eraser.onclick = function(){
    eraserEnabled = true;
    actions.className="actions x"
}

brush.onclick = function(){
    eraserEnabled = false;
    actions.className="actions"
}