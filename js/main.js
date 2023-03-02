//todo: make a start btn and retry btn
// fix collision issue.
// create a database design for users passwords and high-scores
// style page
// deploy :D

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const characterImg = new Image();
characterImg.src = "../layers/character.png";

const blockImg = new Image();
blockImg.src = "../layers/block.png";

const startButton = document.getElementById("startButton");

const scoreIncrement = 50;
let score = 0;
let highScore = 0; // new variable to store the high score
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
    width: 25,
    height: 25,
    speed: 5
};

function jump() {
    if (character.jump || character.y + character.height < canvas.height) {
        return;
    }
    character.jump = true;
    character.jumpCounter = 0;
    character.jumpAmount = 5; // new variable to control the jump height
    character.jumpFrames = 30; // new variable to control the jump duration
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

    // Draw block with border
    ctx.strokeStyle = "black"; // set the border color
    ctx.strokeRect(block.x, block.y, block.width, block.height); // draw the border
    ctx.drawImage(blockImg, block.x + 1, block.y + 1, block.width - 2, block.height - 2); // draw the block

    // Increment score
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 10, 50);

    // Draw high score
    ctx.fillText(`High Score: ${highScore}`, canvas.width - 200, 50);

    // Draw character with border
    ctx.strokeStyle = "black"; // set the border color
    ctx.strokeRect(character.x, character.y, character.width, character.height); // draw the border
    ctx.drawImage(characterImg, character.x + 1, character.y + 1, character.width - 2, character.height - 2); // draw the character

    // Check collision
    checkCollision(character, block);

    // Jump
    if (character.jump) {
        character.y -= character.jumpAmount;
        character.jumpCounter++;
        if (character.jumpCounter === character.jumpFrames) {
            character.jump = false;
            character.jumpAmount = 10;
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
    highScore = 0; // reset the high score when starting a new game
    scoreInterval = setInterval(() => {
        score += scoreIncrement;
    }, 1000);
    startButton.parentNode.removeChild(startButton); // remove startButton from DOM
    paused = false; // Start the game loop
    canvas.classList.add("active"); // Add the "active" class to the canvas
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
    retryButton.classList.add("btn-success","btn");
    retryButton.addEventListener("click", () => {
        score = 0;
        paused = false;
        block.x = canvas.width;
        block.y = canvas.height - 200;
        document.getElementById("gameOverContainer").remove();
        document.getElementById("highScoreContainer").innerText = `High Score: ${highScore}`;
        draw();
    });

    const container = document.createElement("div");
    container.appendChild(scoreDisplay);
    container.appendChild(retryButton);
    container.classList.add("d-flex","justify-content-around","align-items-center");
    container.id = "gameOverContainer";
    document.body.appendChild(container);

    // Update high score
    if (score > highScore) {
        highScore = score;
    }
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