//todo: make a start btn and retry btn
// fix collision issue.
// create a database design for users passwords and high-scores
// style page
// deploy :D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function() {
    gameStarted = true;
    startButton.parentNode.removeChild(startButton);
    draw(); // start the game
});

// Character image
const characterImg = new Image();
characterImg.src = "character.png";

// Character properties
const character = {
    x: 50,
    y: canvas.height - 150,
    width: 100,
    height: 100,
    jump: false
};

// Block image
const blockImg = new Image();
blockImg.src = "block.png";

// Block properties
const block = {
    x: canvas.width,
    y: canvas.height - 200,
    width: 50,
    height: 50,
    speed: 5
};

// Score properties
let score = 0;
const scoreIncrement = 50;
const scoreInterval = setInterval(() => {
    score += scoreIncrement;
}, 1000);

// Jump function
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
        clearInterval(scoreInterval);
        const finalScore = score;
        const retryButton = document.createElement("button");
        retryButton.innerText = "Retry";
        retryButton.addEventListener("click", function() {
            document.location.reload();
        });
        const scoreText = document.createElement("p");
        scoreText.innerText = `Final Score: ${finalScore}`;
        document.body.appendChild(scoreText);
        document.body.appendChild(retryButton);
        gameStarted = false;
    }
}


let gameStarted = false;

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw block
    ctx.drawImage(blockImg, block.x, block.y, block.width, block.height);

    // Move block
    block.x -= block.speed;
    if (block.x + block.width < 0) {
        block.x = canvas.width;
        block.y = Math.floor(Math.random() * (canvas.height - block.height));
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

    if (gameStarted) {
        // existing game code
    }

    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", function () {
        gameStarted = true;
        startButton.parentNode.removeChild(startButton);
    });

// Draw function
    function draw() {
        if (!gameStarted) {
            return;
        }
        // existing game code
    }

// Listen for jump
    document.addEventListener("keydown", event => {
        if (gameStarted && event.code === "Space") {
            jump();
        }
    });
}
// Start game
    draw();


// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
//
// const startButton = document.getElementById("startButton");
//
// startButton.addEventListener("click", function() {
//     gameStarted = true;
//     startButton.parentNode.removeChild(startButton);
// });
//
//
//
// // Character image
// const characterImg = new Image();
// characterImg.src = "character.png";
//
// // Character properties
// const character = {
//     x: 50,
//     y: canvas.height - 150,
//     width: 100,
//     height: 100,
//     jump: false
// };
//
// // Block image
// const blockImg = new Image();
// blockImg.src = "block.png";
//
// // Block properties
// const block = {
//     x: canvas.width,
//     y: canvas.height - 200,
//     width: 50,
//     height: 50,
//     speed: 5
// };
//
// // Score properties
// let score = 0;
// const scoreIncrement = 50;
// const scoreInterval = setInterval(() => {
//     score += scoreIncrement;
// }, 1000);
//
// // Jump function
// function jump() {
//     character.jump = true;
//     character.jumpCounter = 0;
// }
//
// function checkCollision(char, obj) {
//     let charLeft = char.x;
//     let charRight = char.x + char.width;
//     let charTop = char.y;
//     let charBottom = char.y + char.height;
//
//     let objLeft = obj.x;
//     let objRight = obj.x + obj.width;
//     let objTop = obj.y;
//     let objBottom = obj.y + obj.height;
//
//     if (charRight > objLeft && charLeft < objRight && charBottom > objTop && charTop < objBottom) {
//         clearInterval(scoreInterval);
//         const finalScore = score;
//         const retryButton = document.createElement("button");
//         retryButton.innerText = "Retry";
//         retryButton.addEventListener("click", function() {
//             document.location.reload();
//         });
//         const scoreText = document.createElement("p");
//         scoreText.innerText = `Final Score: ${finalScore}`;
//         document.body.appendChild(scoreText);
//         document.body.appendChild(retryButton);
//         gameStarted = false;
//     }
// }
//
//
// let gameStarted = false;
//
// // Draw function
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     // Draw block
//     ctx.drawImage(blockImg, block.x, block.y, block.width, block.height);
//
//     // Move block
//     block.x -= block.speed;
//     if (block.x + block.width < 0) {
//         block.x = canvas.width;
//         block.y = Math.floor(Math.random() * (canvas.height - block.height));
//     }
//
//     // Increment score
//     ctx.font = "24px Arial";
//     ctx.fillStyle = "#000";
//     ctx.fillText(`Score: ${score}`, 10, 50);
//
//     // Check collision
//     checkCollision(character, block);
//
//     // Draw character
//     ctx.drawImage(characterImg, character.x, character.y, character.width, character.height);
//
//     // Jump
//     if (character.jump) {
//         character.y -= 10;
//         character.jumpCounter++;
//
//         if (character.jumpCounter === 30) {
//             character.jump = false;
//         }
//     } else {
//         character.y += 10;
//     }
//
//     // Keep character within canvas
//     if (character.y + character.height > canvas.height) {
//         character.y = canvas.height - character.height;
//     }
//     if (character.y < 0) {
//         character.y = 0;
//     }
//
//     if (gameStarted) {
//         // existing game code
//     }
//
//     requestAnimationFrame(draw);
// }
//
// // Listen for jump
// document.addEventListener("keydown", event => {
//     if (event.code === "Space") {
//         jump();
//     }
// });
//
// // Start game
// draw();
