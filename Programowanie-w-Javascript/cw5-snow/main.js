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
}

window.onload = function () {
    drawFlakes();
};









