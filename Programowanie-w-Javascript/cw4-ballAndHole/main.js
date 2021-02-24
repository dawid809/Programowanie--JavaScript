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

let beta  = 0;
let gamma = 0;
function  onDeviceMove(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
    beta=ev.beta/80;
    gamma=ev.gamma/180;
}

// tworzenie kuli
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;  
    this.dx = dx;
    this.dy = dy;     
    this.radius=radius;
    this.color=color;
    this.draw = function () {
        context.beginPath();
        context.fillStyle=this.color;

        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fill();
        
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
        this.x += this.dx*gamma;
        this.y += this.dy*beta;
        

        this.draw();
    };
}

// twierdzenie pitagorasa - sprawdza odleglosc od siebie 2 obiektow
function getDistance(x1 , y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

let ball = new Circle(100, 100, 3, 2, 50, 'blue');
let hole = new Circle(300, 300, 0, 0, 80, 'green');

ball.draw();
hole.draw();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, windowWidth, windowHeight);
    ball.update();
    hole.update();

    console.log(getDistance(ball.x, ball.y, hole.x, hole.y));

    if(getDistance(ball.x, ball.y, hole.x, hole.y) < ball.radius + hole.radius) hole.color='red';
    else hole.color = 'green';
}

animate();



