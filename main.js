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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw block
    ctx.drawImage(blockImg, block.x, block.y, block.width, block.height);

    // Move block
    block.x -= block.speed;
    if (block.x + block.width < 0) {
        block.x = canvas.width;
        block.y = Math.floor(Math.random() * (canvas.height - block.height));
        score += scoreIncrement;
    }

    // Increment score
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 10, 50);

    // Check collision
    checkCollision(character, block);

    // Draw character
    ctx.drawImage(characterImg, character.x, character.y, character.width, character.height);

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

    requestAnimationFrame(draw);
}

function startGame() {
    score = 0;
    scoreInterval = setInterval(() => {
        score += scoreIncrement;
    }, 1000);
    startButton.parentNode.removeChild(startButton); // remove startButton from DOM
    draw();
}

function endGame() {
    clearInterval(scoreInterval);
    alert(`Game Over! Final Score: ${score}`);
    document.location.reload();
}

// Listen for jump
document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        jump();
    }
});

// Listen for start button click
startButton.addEventListener("click", startGame);



