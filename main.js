const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//todo: assets need to be made for this block
// Character properties
const character = {
    x: 50,
    y: canvas.height - 150,
    width: 100,
    height: 100,
    color: "black",
    jump: false
};

//todo: make assets for the objects coming in and make a random script to make the game harder + work on Grav
// Block properties
const block = {
    x: canvas.width,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: "red",
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

    return charLeft < objRight && charRight > objLeft && charTop < objBottom && charBottom > objTop;

}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.width, character.height);

    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, block.width, block.height);

    // Move character up and down when jumping
    if (character.jump) {
        character.y -= 20;
    } else {
        character.y += 20;
    }

    // Keep character within canvas bounds
    if (character.y > canvas.height - character.height) {
        character.y = canvas.height - character.height;
    } else if (character.y < 0) {
        character.y = 0;
    }

    // Move block left
    block.x -= block.speed;

    // Reset block position if it goes off canvas
    if (block.x + block.width < 0) {
        block.x = canvas.width;
    }

    // Check for collision
    if (checkCollision(character, block)) {
        alert("Game Over");
    }
    requestAnimationFrame(draw);
}

canvas.addEventListener("click", jump);
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
