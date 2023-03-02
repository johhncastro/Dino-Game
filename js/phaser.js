// Set up the game world
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// Load game assets
function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('obstacle', 'assets/obstacle.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 64, frameHeight: 64 });
}

// Set up game objects
function create() {
    // Add game objects
    this.add.image(400, 300, 'background');

    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 550, 'ground').setScale(2).refreshBody();

    this.player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
    this.player.setCollideWorldBounds(true);

    this.obstacles = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });

    // Add movement controls
    this.input.on('pointerdown', () => {
        this.player.setVelocityY(-200);
    });

    // Set up collisions
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.obstacles, gameOver, null, this);

    // Add obstacle every 2 seconds
    this.time.addEvent({
        delay: 2000,
        callback: () => {
            const x = 800;
            const y = Phaser.Math.Between(50, 400);
            const obstacle = this.obstacles.create(x, y, 'obstacle');
            obstacle.setVelocityX(-200);
        },
        loop: true
    });

    // Add scoring system
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

// Handle game logic
function update() {
    this.player.setVelocityX(0);

    if (this.player.y < 100) {
        this.player.setVelocityY(0);
    }

    this.obstacles.getChildren().forEach((obstacle) => {
        if (obstacle.getBounds().right < 0) {
            this.obstacles.killAndHide(obstacle);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
        }
    });
}

// Game over function
function gameOver() {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.add.text(250, 250, 'Game Over', { fontSize: '64px', fill: '#000' });
}

