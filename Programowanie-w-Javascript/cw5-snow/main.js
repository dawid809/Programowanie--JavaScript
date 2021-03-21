// pobranie referencji
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let windowWidth = window.innerWidth ;
let windowHeight = window.innerHeight;

// przypisanie rozmiarow canvas oraz kolor tla
canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.background = '#193340';

// deklaracja maksymalnej ilośći snieżek oraz tablicy
let snowFlakes = 150;
let snowFlakesArray = [];

for(let i = 0; i < snowFlakes; i++){
    snowFlakesArray.push({
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        r: Math.random() * 7 + 2,
        s: Math.random() + 1
    });
}

// rysuje płatki śniegu
function  drawFlakes() {
    context.clearRect(0, 0, windowWidth, windowHeight);
    context.fillStyle =  'snow';
    context.beginPath();

    for(let i = 0; i < snowFlakes; i++)
    {
        let f = snowFlakesArray[i];
        context.moveTo(f.x, f.y);
        context.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    context.fill();
    moveFlakes();
}

let angle = 0;

// animacja śniegu
function moveFlakes() {
    angle += 0.01;

    for (let i = 0; i<snowFlakes; i++){

        let f = snowFlakesArray[i];

        f.y += Math.pow(f.s, 2) + 3;
        f.x += Math.sin(angle) * 2;

        // jeśli śnieżka dotknie dołu, to zmienia położenie na góre
        if(f.y > windowHeight){
            snowFlakesArray[i] = {
                x: Math.random() * windowWidth, y: 0, r: f.r, s: f.s
            };
        }
    }
}

// wywołuj funkcje drawFlakes co 15 ms po wczytaniu strony
window.onload = function () {
    setInterval(drawFlakes, 15);
};








