//todo: make a start btn and retry btn
// fix collision issue.
// create a database design for users passwords and high-scores
// style page
// deploy :D

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const characterImg = new Image();
characterImg.src = "character.png";

const blockImg = new Image();
blockImg.src = "block.png";

const startButton = document.getElementById("startButton");

const scoreIncrement = 50;
let score = 0;
let scoreInterval;
let elapsedTime = 0;

let paused = false;

const character = {
    x: 50,
    y: canvas.height - 150,
    width: 100,
    height: 100,
    jump: false
};

const block = {
    x: canvas.width,
    y: canvas.height - 200,
    width: 50,
    height: 50,
    speed: 5
};

function jump() {
    character.jump = true;
    character.jumpCounter = 0;
}

function checkCollision(char, obj) {
    let charLeft = char.x;
    let charRight = char.x + char.width;
    let charTop = char.y;
    let charBottom = char.y + char.height;

    let objLeft = obj.x;
    let objRight = obj.x + obj.width;
    let objTop = obj.y;
    let objBottom = obj.y + obj.height;

    if (charRight > objLeft && charLeft < objRight && charBottom > objTop && charTop < objBottom) {
        endGame();
    }
}

function draw() {
    if (paused) return; // Pause the game if paused is true

    const deltaTime = 1 / 60; // Assuming 60 FPS
    elapsedTime += deltaTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw block
    ctx.drawImage(blockImg, block.x, block.y, block.width, block.height);

    // Increment score
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 10, 50);

    // Draw character
    ctx.drawImage(characterImg, character.x, character.y, character.width, character.height);

    // Check collision
    checkCollision(character, block);

    // Jump
    if (character.jump) {
        character.y -= 10;
        character.jumpCounter++;

        if (character.jumpCounter === 30) {
            character.jump = false;
        }
    } else {
        character.y += 10;
    }

    // Keep character within canvas
    if (character.y + character.height > canvas.height) {
        character.y = canvas.height - character.height;
    }
    if (character.y < 0) {
        character.y = 0;
    }

    // Generate new blocks
    const BLOCK_INTERVAL = 0.5; // Maximum interval between blocks in seconds
    const MAX_BLOCKS_PER_INTERVAL = 2; // Maximum number of blocks per interval
    let blocksGeneratedThisInterval = 0;
    if (elapsedTime > BLOCK_INTERVAL && blocksGeneratedThisInterval < MAX_BLOCKS_PER_INTERVAL) {
        // Generate a new block
        block.x = canvas.width;
        block.y = Math.floor(Math.random() * (canvas.height - block.height));
        blocksGeneratedThisInterval++;
        elapsedTime -= BLOCK_INTERVAL;
    }

    // Move block
    block.x -= block.speed;

    if (block.x + block.width < 0) {
        block.x = canvas.width;
        block.y = Math.floor(Math.random() * (canvas.height - block.height));
        score += scoreIncrement;
    } else if (block.x > canvas.width) {
        block.x = -block.width;
    }

    requestAnimationFrame(draw);
}




function startGame() {
    score = 0;
    scoreInterval = setInterval(() => {
        score += scoreIncrement;
    }, 1000);
    startButton.parentNode.removeChild(startButton); // remove startButton from DOM
    paused = false; // Start the game loop
    draw();
}

function pauseGame() {
    paused = true; // Pause the game loop
}

function resumeGame() {
    paused = false; // Resume the game loop
    draw();
}

function endGame() {
    clearInterval(scoreInterval);
    pauseGame(); // Pause the game loop
    const scoreDisplay = document.createElement("div");
    scoreDisplay.innerText = `Final Score: ${score}`;
    scoreDisplay.style.fontSize = "24px";
    scoreDisplay.style.textAlign = "center";
    scoreDisplay.style.marginTop = "20px";

    const retryButton = document.createElement("button");
    retryButton.innerText = "Retry";
    retryButton.style.marginTop = "20px";
    retryButton.addEventListener("click", () => {
        document.location.reload();
    });

    const container = document.createElement("div");
    container.appendChild(scoreDisplay);
    container.appendChild(retryButton);
    container.classList.add("d-flex","justify-content-around","align-items-center");
    document.body.appendChild(container);
}



// Listen for start button click
startButton.addEventListener("click", startGame);

// Listen for jump
document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        jump();
    }
});

// Listen for pause/resume
document.addEventListener("keydown", event => {
    if (event.code === "KeyP") {
        if (!paused) {
            pauseGame();
        } else {
            resumeGame();
        }
    }
});








// const background1Img = new Image();
// background1Img.src = "layers/parallax-mountain-bg.png";
// const background2Img = new Image();
// background2Img.src = "layers/parallax-mountain-foreground-trees.png";
// const background3Img = new Image();
// background3Img.src = "layers/parallax-mountain-far.png";
// const background4Img = new Image();
// background4Img.src = "layers/parallax-mountain-mountains.png";
// const background5Img = new Image();
// background5Img.src = "layers/parallax-mountain-trees.png";
//
// const backgrounds = [
//     { img: background1Img, speed: 1, x: 0 },
//     { img: background2Img, speed: 2, x: 0 },
//     { img: background3Img, speed: 3, x: 0 },
//     { img: background4Img, speed: 4, x: 0 },
//     { img: background5Img, speed: 5, x: 0 }
// ];
//
// function drawBackgrounds() {
//     for (let i = 0; i < backgrounds.length; i++) {
//         let bg = backgrounds[i];
//         ctx.drawImage(bg.img, bg.x, 0, canvas.width, canvas.height);
//         bg.x -= character.speed * bg.speed;
//         if (bg.x < -canvas.width) {
//             bg.x += canvas.width;
//         }
//     }
// }