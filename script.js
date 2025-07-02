const reset = document.getElementById("reset");
const rainbow = document.getElementById("rainbow");
const shade = document.getElementById("shade");
const defaultSize = 16;

let currentMode = "rainbow";

rainbow.addEventListener('click', () => {
    shade.style.background = "#b8b9bc";
    shade.style.color = "#000000";
    currentMode = "rainbow";
    rainbow.style.background = "#00bbff";
    rainbow.style.color = "azure";
});

shade.addEventListener('click', () => {
    rainbow.style.background = "#b8b9bc";
    rainbow.style.color = "#000000";
    currentMode = "shade";
    shade.style.background = "#00bbff";
    shade.style.color = "azure";
});

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

function makeGrid(size) {
    const screen = document.querySelector(".screen");
    screen.innerHTML = "";

    const squareSize = 500 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.dataset.hoverCount = 0;
        square.addEventListener('mouseover', (e) => {
            let count = parseInt(square.dataset.hoverCount);
            if (currentMode == "rainbow") {
                square.style.background = getRandomRGB();
            }
            else if (currentMode == "shade") {
                let shadeCount = parseFloat(square.style.opacity) || 0; // If opacity not set, set it to 0
                shadeCount = Math.min(shadeCount + 0.1, 1);
                square.style.backgroundColor = "#000000";
                square.style.opacity = shadeCount;
            }
        });
        screen.appendChild(square);
    }
}

makeGrid(defaultSize);
