const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

// Jump function
function jump() {
    character.jump = true;
    setTimeout(() => {
        character.jump = false;
    }, 500);
}

// Check collision function
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
        alert("Game Over!");
        document.location.reload();
    }
}

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

    // Check collision
    checkCollision(character, block);

    // Draw character
    ctx.drawImage(characterImg, character.x, character.y, character.width, character.height);

    // Jump
    if (character.jump) {
        character.y -= 20;
    } else {
        character.y += 20;
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

// Listen for jump
document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        jump();
    }
});

// Start game
draw();



// TODO: most of the below code is already reused this is kept for baseline functionality! :D

// // Character properties "aka blue square"
// const character = {
//     x: 50,
//     y: canvas.height - 150,
//     width: 100,
//     height: 100,
//     color: "blue",
//     jump: false
// };
//
// // Jump function
// function jump() {
//     character.jump = true;
//     setTimeout(() => {
//         character.jump = false;
//     }, 500);
// }
//
// // Draw function
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = character.color;
//     ctx.fillRect(character.x, character.y, character.width, character.height);
//
//     // Move character up and down when jumping
//     if (character.jump) {
//         character.y -= 20;
//     } else {
//         character.y += 20;
//     }
//
//     // Keep character within canvas bounds
//     if (character.y > canvas.height - character.height) {
//         character.y = canvas.height - character.height;
//     } else if (character.y < 0) {
//         character.y = 0;
//     }
//
//     requestAnimationFrame(draw);
// }
//
//
// canvas.addEventListener("click", jump);
// draw();
