// Declaring Variables
let menuState, gameState, notice;
let oxfordBlue;
let introTimer, noticeTimer, noticeTimerRev;
let noticeBtn1, noticeBtn2;
let logoImg, playBtn, helpBtn;
let playerImg, player;
let ground, bushes, rocks, waterbodies;
let bushTimer, rockTimer, waterTimer;
let fireE, windE, waterE;

// Loading Assets
function preload() {
    logoImg = loadImage('logo1.jpg');
    playerImg = loadImage('bossbaby.png');
}

// Text formatter
function titletxt(title, posX, posY, color, size, width, height) {
    fill(color);
    textSize(size);
    text(title, posX, posY, width, height);
}

// Button sprites (IN DEVELOPMENT)
function btnmod(name, posX, posY, width, height, color, stroke) {
    name.x = posX;
    name.y = posY;
    name.w = width;
    name.h = height;
    name.color = color;
    name.stroke = stroke;
}

// Create Rocks
function createRocks() {
    for (let i = 0; i < rockTimer; i++) {
        let rock = new Sprite();
        rock.collider = 'static';
        rock.diameter = width / random(10, 20);
        rock.color = 'grey';
        rock.stroke = 'black';
        rock.strokeWeight = 3;
        rock.x = random(0, ground.w);  // Cover entire ground
        rock.y = random(0, ground.h);  // Cover entire ground
        rocks.push(rock);
    }
}

// Create Water
function createWater() {
    for (let i = 0; i < waterTimer; i++) {
        let water = new Sprite();
        water.collider = 'static';
        water.w = width / random(10, 20);
        water.h = height / random(10, 20);
        water.color = 'blue';
        water.stroke = 'black';
        water.strokeWeight = 3;
        water.x = random(0, ground.w);  // Cover entire ground
        water.y = random(0, ground.h);  // Cover entire ground
        waterbodies.push(water);
    }
}

// Create Bushes
function createBushes() {
    for (let i = 0; i < bushTimer; i++) {
        let bush = new Sprite();
        bush.collider = 'static';
        bush.w = width / random(5, 10);
        bush.h = height / random(5, 10);
        bush.color = 'green';
        bush.stroke = 'black';
        bush.strokeWeight = 3;
        bush.x = random(0, ground.w);  // Cover entire ground
        bush.y = random(0, ground.h);  // Cover entire ground
        bushes.push(bush);
    }
}

// Create Fire
function fireCreate() {
    fireE = new Sprite();
    fireE.collider = 'dynamic';
    fireE.w = width / 30;
    fireE.h = height / 30;
    fireE.color = 'red';
    fireE.stroke = 'black';
    fireE.x = random(0, ground.w);
    fireE.y = random(0, ground.h);
}

// Create Water Entity
function waterCreate() {
    waterE = new Sprite();
    waterE.collider = 'dynamic';
    waterE.w = width / 30;
    waterE.h = height / 30;
    waterE.color = 'blue';
    waterE.stroke = 'black';
    waterE.x = random(0, ground.w);
    waterE.y = random(0, ground.h);
}

// Create Wind Entity
function windCreate() {
    windE = new Sprite();
    windE.collider = 'dynamic';
    windE.w = width / 30;
    windE.h = height / 30;
    windE.color = 'white';
    windE.stroke = 'black';
    windE.x = random(0, ground.w);
    windE.y = random(0, ground.h);
}

// Defining Variables
function setup() {
    createCanvas(windowWidth, windowHeight);
    rocks = [];
    waterbodies = [];
    bushes = [];

    rockTimer = 200; // Adjusted spawn rate
    waterTimer = 60; // Adjusted spawn rate
    bushTimer = 140; // Adjusted spawn rate
    oxfordBlue = '#002147';

    // Background
    ground = new Sprite();
    ground.collider = 'static';
    ground.x = width / 2;
    ground.y = height / 2;
    ground.w = width * 25;
    ground.h = height * 25;
    ground.color = 'lime';
    ground.visible = false;

    // Timers
    introTimer = 0;
    noticeTimer = 0;
    noticeTimerRev = 600;

    // Notice buttons
    noticeBtn1 = new Sprite();
    noticeBtn1.collider = 'static';
    noticeBtn1.x = width / 2;
    noticeBtn1.y = height / 1.2;
    noticeBtn1.w = width / 3;
    noticeBtn1.h = height / 9;
    noticeBtn1.color = 'grey';
    noticeBtn1.stroke = 'black';
    noticeBtn1.textSize = width / 30;
    noticeBtn1.text = "I understood";
    noticeBtn1.visible = false;

    noticeBtn2 = new Sprite();
    noticeBtn2.collider = 'static';
    noticeBtn2.x = width / 2;
    noticeBtn2.y = height / 1.2;
    noticeBtn2.w = width / 3;
    noticeBtn2.h = height / 9;
    noticeBtn2.color = 'yellow';
    noticeBtn2.stroke = 'orange';
    noticeBtn2.textSize = width / 30;
    noticeBtn2.text = "I understood";
    noticeBtn2.visible = false;

    playBtn = new Sprite();
    playBtn.collider = 'static';
    playBtn.x = width / 2;
    playBtn.y = height / 2;
    playBtn.w = width / 5;
    playBtn.h = height / 9;
    playBtn.color = 'yellow';
    playBtn.stroke = 'orange';
    playBtn.strokeWeight = 3;
    playBtn.textSize = width / 30;
    playBtn.text = "Play";
    playBtn.visible = false;

    helpBtn = new Sprite();
    helpBtn.collider = 'static';
    helpBtn.x = width / 2;
    helpBtn.y = height / 1.6;
    helpBtn.w = width / 5;
    helpBtn.h = height / 9;
    helpBtn.color = 'yellow';
    helpBtn.stroke = 'orange';
    helpBtn.strokeWeight = 3;
    helpBtn.textSize = width / 30;
    helpBtn.text = "Help";
    helpBtn.visible = false;

    player = new Sprite();
    player.collider = 'static';
    player.x = width / 2;
    player.y = height / 2;
    player.w = width / 20;
    player.h = width / 20;
    player.addImage(playerImg);
    player.scale = 0.25;
    player.visible = false;
}

// Additional variables for tracking enemy spawn times
let lastFireSpawnTime = 0;
let lastWindSpawnTime = 0;
let lastWaterSpawnTime = 0;

// Loop
function draw() {
    // Refresher
    background(oxfordBlue);

    // Responsive menu
    menuState = sessionStorage.getItem('menuState');
    notice = localStorage.getItem('notice');
    gameState = sessionStorage.getItem('gameState');

    // New browser session
    if (menuState === null) {
        sessionStorage.setItem('menuState', 'intro');
    } 
    else if (menuState === 'intro') {
        introTimer += 1;

        // Our team
        if (introTimer > 150 && introTimer < 450) {
            titletxt('Developed by team UbiStrong', width / 20, height / 2, 'yellow', width / 15);
        }

        if (introTimer > 500 && introTimer < 1000) {
            titletxt('Members:', width / 10, height / 5, 'yellow', width / 20);
            if (introTimer > 550) {
                titletxt('Ansh Jadhav', width / 5, height / 2.75, 'white', width / 25);
            }
            if (introTimer > 600) {
                titletxt('Aarush Paathak', width / 5, height / 2.25, 'white', width / 25);
            }
            if (introTimer > 650) {
                titletxt('Mit Patel', width / 5, height / 1.9, 'white', width / 25);
            }
            if (introTimer > 700) {
                titletxt('Atharva Shitkande', width / 5, height / 1.65, 'white', width / 25);
            }
        }

        // Libraries Used
        if (introTimer > 1050 && introTimer < 1550) {
            titletxt('Libraries:', width / 10, height / 5, 'yellow', width / 20);
            if (introTimer > 1100) {
                titletxt('P5.js', width / 5, height / 2.75, 'white', width / 25);
            }
            if (introTimer > 1150) {
                titletxt('P5Sound.js', width / 5, height / 2.25, 'white', width / 25);
            }
            if (introTimer > 1200) {
                titletxt('Planck.js', width / 5, height / 1.9, 'white', width / 25);
            }
            if (introTimer > 1250) {
                titletxt('P5Play.js', width / 5, height / 1.65, 'white', width / 25);
            }
        }

        // Change to main menu
        if (introTimer > 1600) {
            sessionStorage.setItem('menuState', 'mainmenu');
        }

        // Debugging
        console.log(introTimer);
    }
    else if (menuState === 'mainmenu') {
        // Notice
        if (notice === null) {
            noticeTimer += 1;
            titletxt('Notice:', width / 10, height / 5, 'yellow', width / 20);
            if (noticeTimer > 50) {
                titletxt('This game is designed to run on computers with Chrome or MS Edge. Using other browsers or devices may not provide you with the optimal experience of our game. Do not tamper with the local and session storage of your browser as it can break the application.', width / 10, height / 3, 'white', width / 30, width / 1.2);
            }

            if (noticeTimer > 100 && noticeTimerRev > 0) {
                noticeBtn1.visible = true;
                titletxt(Math.round(noticeTimerRev / 60), width / 1.4, height / 1.175, 'yellow', width / 30);
                noticeTimerRev -= 1;
            } else {
                noticeBtn1.visible = false;
            }
            if (noticeTimer > 700) {
                noticeBtn2.visible = true;
                if (noticeBtn2.mouse.pressed()) {
                    localStorage.setItem('notice', 'yoIloggedin');
                    noticeBtn2.visible = false;
                }
            }
        } else {
            image(logoImg, width / 3, height / 5);
            playBtn.visible = true;
            helpBtn.visible = true;
        }

        if (playBtn.mouse.pressed()) {
            sessionStorage.setItem('menuState', 'gaming');
            sessionStorage.setItem('gameState', 'start');
            playBtn.visible = false;
            helpBtn.visible = false;
        }
    } else if (menuState === 'gaming') {
        camera.on();
        camera.zoom = 0.75;
        camera.x = player.x;
        camera.y = player.y;
        player.visible = true;
        if (rocks.length === 0) createRocks();
        if (waterbodies.length === 0) createWater();
        if (bushes.length === 0) createBushes();
        ground.visible = true;

        // Handle player movement
        if (kb.pressing('up')) {
            player.y -= 30;
            player.rotation = 0;
        } else if (kb.pressing('down')) {
            player.y += 30;
            player.rotation = 180;
        } else if (kb.pressing('right')) {
            player.x += 30;
            player.rotation = 90;
        } else if (kb.pressing('left')) {
            player.x -= 30;
            player.rotation = 270;
        }

        // Create enemies periodically
        if (millis() - lastFireSpawnTime > 4000) { // Every 4 seconds
            fireCreate();
            lastFireSpawnTime = millis();
        }

        if (millis() - lastWindSpawnTime > 4000) { // Every 4 seconds
            windCreate();
            lastWindSpawnTime = millis();
        }

        if (millis() - lastWaterSpawnTime > 4000) { // Every 4 seconds
            waterCreate();
            lastWaterSpawnTime = millis();
        }

        // Move enemies towards player
        if (fireE) {
            fireE.moveTowards(player);
            fireE.speed = 2;
        }
        if (windE) {
            windE.moveTowards(player);
            windE.speed = 3;
        }
        if (waterE) {
            waterE.moveTowards(player);
            waterE.speed = 1;
        }

        // Collision checks
        rocks.forEach((rock, index) => {
            if (fireE && fireE.collides(rock)) {
                rocks.splice(index, 1);
                fireE.remove();
            }
            if (windE && windE.collides(rock)) {
                rocks.splice(index, 1);
                windE.remove();
            }
        });

        waterbodies.forEach((waterbody, index) => {
            if (waterE && waterE.collides(waterbody)) {
                waterbodies.splice(index, 1);
                waterE.remove();
            }
        });

        bushes.forEach((bush, index) => {
            if (waterE && waterE.collides(bush)) {
                bushes.splice(index, 1);
                waterE.remove();
            }
        });

        if (waterE && waterE.collides(player)) {
            alert("GAME OVER");
            sessionStorage.setItem('menuState', 'mainmenu');
            location.reload();
        }
    } else {
        rocks.forEach(r => r.visible = false);
        ground.visible = false;
        waterbodies.forEach(w => w.visible = false);
        bushes.forEach(b => b.visible = false);
    }
}
