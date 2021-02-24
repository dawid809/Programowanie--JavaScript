// pobranie referencji
let canvas=document.getElementById('canvas');
window.addEventListener('deviceorientation', onDeviceMove);

let context= canvas.getContext('2d');
const windowWidth = window.innerWidth -20 ;
const windowHeight = window.innerHeight -20;

// przypisanie rozmiarow canvas oraz kolor tla
canvas.width=windowWidth;
canvas.height=windowHeight;
canvas.style.background='#293340';


let fontFamily = '40px Comic Sans MS';
context.textAlign = 'center'; 
context.font = fontFamily;

let beta  = 0;
let gamma = 0;

function  onDeviceMove(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
    beta=ev.beta/80;
    gamma=ev.gamma/180;
}

function Trap(x, y, dx, dy, radius, color) {
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
        this.x += this.dx;
        this.y += this.dy;
        

        this.draw();
    };
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

let ball = new Circle(windowWidth*0.1, windowHeight*0.5, 3, 2, 50, '#166B8C');
let hole = new Circle(windowWidth*0.9, windowHeight*0.5, 0, 0, 80, '#222326');
let avtiveTrap1 = new Trap(windowWidth*0.25, windowHeight*0.7, 0, 4,windowHeight*0.05, '#592D1D');
let avtiveTrap2 = new Trap(windowWidth*0.7, windowHeight*0.4, 0, 3, windowHeight*0.1, '#592D1D');
let passiveTrap1 = new Trap(windowWidth*0.5, windowHeight*0.8, 0, 0, windowHeight*0.1, '#80848C');
let passiveTrap2 = new Trap(windowWidth*0.5, windowHeight*0.2, 0, 0, windowHeight*0.15, '##80848C');

let colisionColor='#F24130';
let activeTrapColor='#592D1D';
let passiveTrapColor='#80848C';


function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, windowWidth, windowHeight);
    ball.update();
    hole.update();
    avtiveTrap1.update();
    avtiveTrap2.update();
    passiveTrap1.update();
    passiveTrap2.update();

    //console.log(getDistance(ball.x, ball.y, hole.x, hole.y));
    context.fillText('Czas', windowWidth/2, windowHeight*0.1);

    if(getDistance(ball.x, ball.y, hole.x, hole.y) < ball.radius + hole.radius){
        hole.color='#02732A';   
    } 
    else hole.color = '#222326';

    if(getDistance(ball.x, ball.y, avtiveTrap1.x, avtiveTrap1.y) < ball.radius + avtiveTrap1.radius){
        avtiveTrap1.color= colisionColor;
    }
    else avtiveTrap1.color = activeTrapColor;

    if(getDistance(ball.x, ball.y, avtiveTrap2.x, avtiveTrap2.y) < ball.radius + avtiveTrap2.radius){
        avtiveTrap2.color=colisionColor;
    }
    else avtiveTrap2.color = activeTrapColor;

    if(getDistance(ball.x, ball.y, passiveTrap1.x, passiveTrap1.y) < ball.radius + passiveTrap1.radius){
        passiveTrap1.color=colisionColor;
    }
    else passiveTrap1.color = passiveTrapColor;

    if(getDistance(ball.x, ball.y, passiveTrap2.x, passiveTrap2.y) < ball.radius + passiveTrap2.radius){
        passiveTrap2.color=colisionColor;
    }
    else passiveTrap2.color = passiveTrapColor;
}

animate();



