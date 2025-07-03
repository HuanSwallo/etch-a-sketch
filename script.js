// Consants
const reset = document.getElementById("reset");
const rainbow = document.getElementById("rainbow");
const shade = document.getElementById("shade");
const click = document.getElementById("click");
const eraser = document.getElementById("eraser")
const colorPicker = document.getElementById("color-picker");
const defaultSize = 16;
// Global Variables
let currentMode = "rainbow";
let prevMode = "rainbow";
let drawing = false;
let clickOn = false;
let eraserOn = false;
let customColor = "#000000";
let useCustomColor = false;

// Global Event Listeners for the mouse state
document.body.addEventListener('mousedown', () => drawing = true);
document.body.addEventListener('mouseup', () => drawing = false);

rainbow.addEventListener('click', () => {
    currentMode = "rainbow";
    useCustomColor = false;
    shade.classList.remove("toggled");
    eraser.classList.remove("toggled");
    rainbow.classList.add("toggled");
});

shade.addEventListener('click', () => {
    currentMode = "shade";
    useCustomColor = false;
    rainbow.classList.remove("toggled");
    eraser.classList.remove("toggled");
    shade.classList.add("toggled");
});

click.addEventListener('click', () => {
    clickOn = !clickOn;

    if (clickOn) {
        // Saves previous mode
        if (rainbow.classList.contains("toggled")) {
            prevMode = rainbow;
        } else if (shade.classList.contains("toggled")) {
            prevMode = shade;
        }

        useCustomColor = true;
        click.classList.add("toggled");
    } else {
        click.classList.remove("toggled");
        // Toggle previous mode whenever eraser and click is off
        if (!eraserOn && prevMode) {
            prevMode.classList.add("toggled");
            currentMode = prevMode.id;
        }
    }
});

eraser.addEventListener('click', () => {
    eraserOn = !eraserOn;

    if (eraserOn) {
        // Saves previous mode
        if (rainbow.classList.contains("toggled")) {
            prevMode = rainbow;
        } else if (shade.classList.contains("toggled")) {
            prevMode = shade;
        }

        rainbow.classList.remove("toggled");
        shade.classList.remove("toggled");
        eraser.classList.add("toggled");
    } else {
        eraser.classList.remove("toggled");
        // Toggle previous mode whenever eraser and click is off
        if (!clickOn && prevMode) {
            prevMode.classList.add("toggled");
            currentMode = prevMode.id;
        }
    }
    
});

colorPicker.addEventListener('input', (e) => {
    customColor = e.target.value;
});

// Resets and creates a new grid
reset.addEventListener('click', () => {
    let newSize = prompt("Enter new grid size (1–100):");
    newSize = parseInt(newSize);
    
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    makeGrid(newSize);
});

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 

    return `rgb(${r}, ${g}, ${b})`;
}

// Draws the square based on the conditions
function doDraw(square) {
    if (eraserOn) {
        square.style.backgroundColor = "";
        square.style.opacity = "";
    } else if (clickOn) {
        square.style.backgroundColor = customColor;
        square.style.opacity = "1";
    } else if (currentMode == "rainbow") {
        square.style.background = getRandomRGB();
    } else if (currentMode == "shade") {
        let shadeCount = parseFloat(square.style.opacity) || 0; // If opacity not set, set it to 0
        shadeCount = Math.min(shadeCount + 0.1, 1);
        square.style.backgroundColor = "#000000";
        square.style.opacity = shadeCount;
    }
}

function makeGrid(size) {
    const screen = document.querySelector(".screen");
    screen.innerHTML = ""; // Clears the grid

    const squareSize = 500 / size; // Compute the size of the square

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        //Event when left mouse button is pressed down
        square.addEventListener("mousedown", (e) => {
            if (e.buttons !== 1) return; // Do nothing if mouse buttons other than left mouse triggers
            doDraw(square);
        });
        //Event when mouse hovers over element. Also works with mousedown (mousedown + mouseover)
        square.addEventListener('mouseover', (e) => {
            if (clickOn && !drawing) return; // Do nothing if click mode is on and drawing is false (mouse is not down)
            doDraw(square);
        });
        // Event when a square is clicked
        square.addEventListener("click", () => {
            doDraw(square);
        });
        screen.appendChild(square);
    }
}
//Creates grid by default
window.onload = () => {
    makeGrid(defaultSize);
};