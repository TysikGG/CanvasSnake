var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mainC = [[100, 100]]
const fps = 20;
pos = 'up'
step = 10
gameStop = false
eatC = []
eatC[0] = getRandomInt(50)*10
eatC[1] = getRandomInt(50)*10
function drawSnake() {
    for(var i = 0; i < mainC.length; i++){
        ctx.fillStyle = "green";
        var coord = mainC[i]
        var x = coord[0]
        var y = coord[1]
        ctx.fillRect(x, y, 10, 10);
    }
}
function getRandomInt(max) {
    return Math.floor((Math.random() * max-5)+5);
  }
function drawEat() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(eatC[0], eatC[1], 10, 10);
}
function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 500);
}

window.addEventListener('keydown',this.check,false);
function check(e) {
    var code = e.keyCode;
    if(code == 83 && pos != 'up') { pos = 'down' }
    if(code == 87 && pos != 'down') { pos = 'up' }
    if(code == 65 && pos != 'right') { pos = 'left' }
    if(code == 68 && pos != 'left') { pos = 'right' }
}
setInterval(() => {
    if(gameStop == true) return 
    clear()
    drawEat()
    for(var i = 1; i < mainC.length; i++){
        var coord = mainC[i]
        var x = coord[0]
        var y = coord[1]
        head = mainC[0]
        if(head[0] == x && head[1] == y) {
            alert('Вы проиграли!')
            gameStop = true
        }
    }
    var coord = mainC[mainC.length-1]
    var x = coord[0]
    var y = coord[1]
    if(x > 500 || x < 0 || y > 500 || y < 0) {
        alert('Вы проиграли!')
        gameStop = true
    }
    if (x == eatC[0] && y == eatC[1]) {
        eatC[0] = getRandomInt(50)*10
        eatC[1] = getRandomInt(50)*10
    } else {
        mainC.shift()
    }
    if (pos == 'up') { mainC.push([x, y - step]) }
    if (pos == 'down') { mainC.push([x, y + step]) }
    if (pos == 'right') { mainC.push([x + step, y]) }
    if (pos == 'left') { mainC.push([x - step, y]) }
    drawSnake()
}, 1000 / fps);

