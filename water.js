//Declaring Variables
let menuState, gameState, notice;
let oxfordBlue;
let introTimer, noticeTimer, noticeTimerRev;
let noticeBtn1, noticeBtn2;

//Loading Assets
function preload() {

}

//UD functions

    //Text formatter
function titletxt(title, posX, posY, color, size, width, height) {
        fill(color);
        textSize(size);
        text(title, posX, posY, width, height);
}

    //Button spritee (IN DEVELOPMENT)
function btnmod(name, posX, posY, width, height, color, stroke) {
    name.x = canvas.w/posX;
    name.y = canvas.w/posY;
    name.w = canvas.w/width;
    name.h = canvas.h/height;
    name.color = color;
    name.stroke = stroke;
}

//Defining variables
function setup() {

    oxfordBlue = '#002147';

    //Background
    new Canvas();

    //Timers
    introTimer = 0;
    noticeTimer = 0;
    noticeTimerRev = 600;

    //Notice buttons
    noticeBtn1 = new Sprite();
    noticeBtn1.collider = 'static';
    noticeBtn1.x = canvas.w/2
    noticeBtn1.y = canvas.h/1.2;
    noticeBtn1.w = canvas.w/3;
    noticeBtn1.h = canvas.h/9;
    noticeBtn1.color = 'grey';
    noticeBtn1.stroke = 'black';
    noticeBtn1.visible = false;

    noticeBtn2 = new Sprite();
    noticeBtn2.collider = 'static';
    noticeBtn2.x = canvas.w/2
    noticeBtn2.y = canvas.h/1.2;
    noticeBtn2.w = canvas.w/3;
    noticeBtn2.h = canvas.h/9;
    noticeBtn2.color = 'yellow';
    noticeBtn2.stroke = 'orange';
    noticeBtn2.textSize = canvas.w/30
    noticeBtn2.text = "I understood";
    noticeBtn2.visible = false;
}

//Loop
function draw() {

    //Refresher
    background(oxfordBlue)

    //Responsive menu
    menuState = sessionStorage.getItem('menuState');
    console.log(menuState);
    notice = localStorage.getItem('notice');

    //New browser session
    if(menuState === null) {
        sessionStorage.setItem('menuState','intro');
    } 
    //Intro
    else if(menuState === 'intro') {
        introTimer +=1;

        //Our team
        if(introTimer >150 && introTimer <450) {
            titletxt('Developed by team UbiStrong', canvas.w/20, canvas.h/2, 'yellow', canvas.w/15);
        }

        if(introTimer >500 && introTimer <1000) {
            titletxt('Members:',canvas.w/10, canvas.h/5, 'yellow', canvas.w/20);
            if(introTimer >550) {
                titletxt('Ansh Jadhav',canvas.w/5, canvas.h/2.75, 'white', canvas.w/25);
            }
            if (introTimer >600) {
                titletxt('Aarush Paathak',canvas.w/5, canvas.h/2.25, 'white', canvas.w/25);
            }
            if(introTimer >650) {
                titletxt('Mit Patel',canvas.w/5, canvas.h/1.9, 'white', canvas.w/25);
            }
            if (introTimer >700) {
                titletxt('Atharva Shitkande',canvas.w/5, canvas.h/1.65, 'white', canvas.w/25);
            }
        }

        //Libraries Used
        if(introTimer >1050 && introTimer <1550) {
            titletxt('Libraries:',canvas.w/10, canvas.h/5, 'yellow', canvas.w/20);
            if(introTimer >1100) {
                titletxt('P5.js',canvas.w/5, canvas.h/2.75, 'white', canvas.w/25);
            }
            if (introTimer >1150) {
                titletxt('P5Sound.js',canvas.w/5, canvas.h/2.25, 'white', canvas.w/25);
            }
            if(introTimer >1200) {
                titletxt('Planck.js',canvas.w/5, canvas.h/1.9, 'white', canvas.w/25);
            }
            if (introTimer >1250) {
                titletxt('P5Play.js',canvas.w/5, canvas.h/1.65, 'white', canvas.w/25);
            }
        }

        //Change to main menu
        if(introTimer > 1600) {
            sessionStorage.setItem('menuState','mainmenu');
        }
    
    //Debugging
    console.log(introTimer);

    }
    else if(menuState === 'mainmenu') {

        //Notice
        if(notice === null) {
            noticeTimer +=1;
            titletxt('Notice:',canvas.w/10, canvas.h/5, 'yellow', canvas.w/20);
            if(noticeTimer > 50) {
                titletxt('This game is designed to run on computers with Chrome or MS Edge. Using other browsers or devices may not provide you with the optimal experience of our game. Do not tamper with the local and session storage of your browser as it can break the application.', canvas.w/10, canvas.h/3, 'white', canvas.w/30, canvas.w/1.2);
            }

            //Note: Find a way to use the function for this
            if (noticeTimer >100 && noticeTimerRev >0) {
                noticeBtn1.visible = true;
                titletxt(Math.round(noticeTimerRev/60), canvas.w/1.4, canvas.h/1.175, 'yellow', canvas.w/30);
                noticeTimerRev -=1;
            }
            else{
                noticeBtn1.visible = false;
            }
            if(noticeTimer >760) {
                noticeBtn2.visible = true;
            }
        }
    }
}
