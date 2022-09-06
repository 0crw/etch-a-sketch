const grid = document.querySelector('.mainGrid');
const slider = document.getElementById('myRange');
const sliderNum = document.getElementById('sliderValue');
const clearBtn = document.getElementById('clear');
const eraseBtn = document.getElementById('erase');
const blackBtn = document.getElementById('black');
const randomBtn = document.getElementById('random');
const colorPicker = document.getElementById('colorPicker');
const prevBtn = document.getElementById('previous');

let currentColor = '#333';
let previousColor;
let backColor;
let pickedColor;

let numOfPixels = slider.value;

//Buttons eventListener 
clearBtn.addEventListener('click', clear);
eraseBtn.addEventListener('click', erase);
randomBtn.addEventListener('click', random);
blackBtn.addEventListener('click', toBlack);
// prevBtn.addEventListener('click', backToPrevious);


//Create grid & setting grid size
function gridSize(size) {
    for (let i = 0; i < size *size; i++){
        const div = document.createElement('div');
        div.className = 'pixel';
        grid.appendChild(div);
    }
    pixels = document.querySelectorAll('.pixel');
    mouseOverPixel();
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
};

//Color each pixel
function mouseOverPixel() {
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            pixel.style.backgroundColor = currentColor;
        });
    });
};

//Size slider
sliderNum.textContent = `${slider.value} x ${slider.value}`;

//Refresh slider value
slider.oninput = function() {
    reset();
    sliderNum.textContent = `${this.value} x ${this.value}`;
    numOfPixels = slider.value;
    gridSize(numOfPixels);
};

gridSize(numOfPixels);


//Color picked from rgb table
// colorPicker.oninput = (tint) => newCurrentColor(tint.target.value);

// function newCurrentColor(newColor) {
//     backColor = pickedColor
//     pickedColor = newColor;
//     previousColor = currentColor;
//     currentColor = pickedColor;
// };

function random() {
    previousColor = currentColor;
    currentColor = `hsl(${Math.random() * 360}, 90%, 70%)`;
    eraseBtn.classList.remove('isActive');
}

// function backToPrevious() {
//     backColor = currentColor;
//     currentColor = previousColor;
//     previousColor = backColor;
// }

function toBlack() {
    if(currentColor != '#333') {
        previousColor = currentColor;
        currentColor = '#333';
        eraseBtn.classList.remove('isActive');
    } else {
        currentColor = previousColor;
    };
}

function erase() {
    if (currentColor != '#ededed') {
        previousColor = currentColor;
        currentColor = '#ededed';
        console.log(previousColor);
        eraseBtn.classList.add('isActive');
    } else {
        currentColor = previousColor;
        eraseBtn.classList.remove('isActive'); 
    };
};

function clear() {
    reset();
    gridSize(numOfPixels);
    eraseBtn.classList.remove('isActive');
};

function reset() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}