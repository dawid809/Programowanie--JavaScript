// pobranie referencji
let canvas=document.getElementById('canvas');
window.addEventListener('deviceorientation', onDeviceMove);

let context= canvas.getContext('2d');
const windowWidth = window.innerWidth -20 ;
const windowHeight = window.innerHeight -20;

// przypisanie rozmiarow canvas oraz kolor tla
canvas.width=windowWidth;
canvas.height=windowHeight;
canvas.style.background='#afd888';


function  onDeviceMove(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
}

// tworzenie kuli
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;  
    this.dx = dx;
    this.dy = dy;     
    this.radius=radius;
    this.draw = function () {
        context.beginPath();
        context.fillStyle='red';
        console.log('ref');
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fill();
        context.stroke();
    };
    //  zmiana kierunku ruchu kuli
    this.update = function () {
        if(this.x + this.radius > windowWidth || this.x - this.radius < 0)
        {
            this.dx = -this.dx;
        }

        if(this.y + this.radius > windowHeight || this.y - this.radius < 0)
        {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

let ball = new Circle(100, 100, 3, 2, 50);
ball.draw();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0,0, windowWidth, windowHeight);
    ball.update();

}

animate();



