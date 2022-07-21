const grid = document.querySelector(".grid-container");
const slider = document.getElementById("myRange");
const clearButton = document.getElementById("clearButton");
const eraseButton = document.getElementById("eraseButton");
const randomButton = document.getElementById("randomButton")
let colorPicker = document.getElementById("colorPicker");
let output = document.getElementById('sliderValue');
let randomColor = `hsl(${Math.random() * 360}, 90%, 70%)` 
let currentColor = colorPicker.value;
let numOfSquares = slider.value;
let colorPicked = colorPicker.value


//Buttons
clearButton.addEventListener('click', clearBoard)
eraseButton.addEventListener('click', eraseFuncButton)
blackButton.addEventListener('click', blackFuncButton)
randomButton.addEventListener('click', randomFuncButton)

//Display the default slider value
output.innerHTML = `${slider.value} x ${slider.value}`
//Update the current slider value
slider.oninput = function() {
    reset()
    output.innerHTML = `${this.value} x ${this.value}`;
    numOfSquares = slider.value;
    gridSize(numOfSquares)
}


//Grid creating
function gridSize(size) {
    for (i= 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.className = "square";
        grid.appendChild(div)
    }
    squares = document.querySelectorAll(".square");
    squareMouseOverColor();
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}
gridSize(numOfSquares)


//Mouseover effect
function squareMouseOverColor() {
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = currentColor;
        })
    })
}


//colorPicker for colorButton
colorPicker.oninput = (tint) => newCurrentColor(tint.target.value)

//Setting color from colorPicker to currentColor
function newCurrentColor(newColor) {
    colorPicked = newColor;
    currentColor = colorPicked;  
}

//clearBoard function for the clearButton
function clearBoard() {
    reset()
    gridSize(numOfSquares)
}

//reset function
function reset() {
    while (grid.firstChild){
        grid.removeChild(grid.lastChild);
    }
}

//setting currentColor as #ededed for the eraseButton
function eraseFuncButton() {
    if(currentColor !== '#ededed'){
      currentColor = '#ededed';
      eraseButton.classList.add("isActive")
      
    }else {
      currentColor = colorPicked;
      eraseButton.classList.remove("isActive")
      
    }
}

//setting currentColor as #333333 for the blackButton
function blackFuncButton() {
    if(currentColor !== '#333333'){
        currentColor = '#333333'
    }
}

//setting currentColor as colorPicked from the colorPicker input
function colorFuncButton(){
    if(currentColor === '#ededed' || currentColor === '#333333'){
        currentColor = colorPicked;
    }
    
}

function randomFuncButton() {
  currentColor = `hsl(${Math.random() * 360}, 90%, 70%)` 
}