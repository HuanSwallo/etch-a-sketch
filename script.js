const reset = document.getElementById("reset");

function makeGrid(size) {
    const screen = document.querySelector(".screen");
    screen.innerHTML = "";

    const squareSize = 500 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.border = "1px solid #000";
        square.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = '#000';
        });
        screen.appendChild(square);
    }
}

reset.addEventListener('click', () => {
    let newSize = prompt("Enter new grid size (1–100):");

    newSize = parseInt(newSize);
    
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    makeGrid(newSize);
});

makeGrid(16);
