/* ====================================
   GLOBAL VARIABLES
==================================== */
let cakeCut = false;

let blownCandles = 0;

let currentMemory = 0;

let isTyping = false;

const PASSWORD = CONFIG.password;

const music =
document.getElementById("bgMusic");

/* ====================================
   PAGE SYSTEM
==================================== */

function showPage(pageId){

    document
    .querySelectorAll(".page")
    .forEach(page => {

        page.classList.remove("active");

    });

    document
    .getElementById(pageId)
    .classList.add("active");
}

/* ====================================
   PASSWORD SYSTEM
==================================== */

function checkPassword(){

    const enteredPassword =
    document
    .getElementById("passwordInput")
    .value
    .trim();

    if(
        enteredPassword === PASSWORD
    ){

        startMusic();

        showPage("candlePage");

    }
    else{

        document
        .getElementById("errorText")
        .innerText =
        "Wrong Password 🌸";

    }
}

/* ====================================
   MUSIC
==================================== */

function startMusic(){

    if(!music) return;

    music.volume = 0.4;

    music.loop = true; // force repeat

    music.play()
    .then(() => {
        console.log("Music started");
    })
    .catch((err) => {
        console.log("Music blocked:", err);
    });
}

/* ====================================
   POPUP SYSTEM
==================================== */

function openPopup(
    title,
    message
){

    document
    .getElementById("popupTitle")
    .innerHTML =
    title;

    document
    .getElementById("popupText")
    .innerHTML =
    message;

    document
    .getElementById("popup")
    .classList
    .remove("hidden");
}

function closePopup(){

    document
    .getElementById("popup")
    .classList
    .add("hidden");
}

/* ====================================
   WISH POPUP
==================================== */

function openWishPopup(message){

    document
    .getElementById("wishContent")
    .innerHTML =
    message;

    document
    .getElementById("wishPopup")
    .classList
    .remove("hidden");
}

function closeWishPopup(){

    document
    .getElementById("wishPopup")
    .classList
    .add("hidden");

    if(
        blownCandles >= 3
    ){

        document
        .getElementById(
            "continueToMemories"
        )
        .classList
        .remove("hidden");

    }
}

/* ====================================
   MEMORY START
==================================== */

/* ====================================
   RANDOM HELPERS
==================================== */

function random(min,max){

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}

function randomColor(){

    const colors = [

        "#ff69b4",
        "#ffd166",
        "#7bdff2",
        "#cdb4db",
        "#ff8fab"

    ];

    return colors[
        random(
            0,
            colors.length - 1
        )
    ];
}
/* ====================================
   CANDLE SYSTEM
==================================== */

function blowCandle(index){

    const flames =
    document.querySelectorAll(
        ".flame"
    );

    if(
        !flames[index] ||
        flames[index].style.display ===
        "none"
    ){
        return;
    }

    flames[index].style.display =
    "none";

    const wishMessage =
    CONFIG.wishes[index] ||
    "A beautiful wish for you ✨";

    openWishPopup(
        wishMessage
    );

    createHearts();

    blownCandles++;

}

/* ====================================
   MEMORY SYSTEM
==================================== */

let slideshowInterval;

function startMemories(){

    clearInterval(slideshowInterval);

    currentMemory = 0;

    showPage("memoryPage");

    loadMemory();

    slideshowInterval = setInterval(() => {

        currentMemory++;

        if(currentMemory >= CONFIG.photos.length){
            clearInterval(slideshowInterval);
            openBalloonPage();
            return;
        }

        loadMemory();

    }, 4000);
}
function loadMemory(){
    console.log("Loading photo:", currentMemory);

    const photo =
    document.getElementById("memoryPhoto");

    photo.src =
    CONFIG.photos[currentMemory];

    photo.style.animation = "none";
    void photo.offsetWidth;
    photo.style.animation =
    "photoTransition 4s linear forwards";

    createMemoryFlowers();
}

function createMemoryFlowers(){

    const container =
    document.getElementById("sakuraContainer");

    for(let i=0;i<20;i++){

        const flower =
        document.createElement("div");

        flower.className = "memoryFlower";

        flower.innerHTML = "🌸";

        flower.style.left =
        (Math.random() * window.innerWidth) + "px";

        flower.style.fontSize =
        (20 + Math.random()*20) + "px";

        flower.style.animationDuration =
        (4 + Math.random()*4) + "s";

        container.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 8000);
    }
}
/* ====================================
   BALLOON PAGE
==================================== */

function openBalloonPage(){

    showPage(
        "balloonPage"
    );

    generateBalloons();
}
/* ====================================
   BALLOON GENERATOR
==================================== */

function generateBalloons(){

    const container =
    document.getElementById(
        "balloonContainer"
    );

    container.innerHTML = "";

    const emojis = [
        "🎈",
        "🎈",
        "🎈",
        "💖",
        "✨"
    ];

    for(let i = 0; i < 30; i++){

        const balloon =
        document.createElement(
            "div"
        );

        balloon.className =
        "balloon";

        balloon.innerHTML =
        emojis[
            random(
                0,
                emojis.length - 1
            )
        ];

        balloon.style.left =
        random(0,100) + "vw";

        balloon.style.animationDuration =
        random(5,10) + "s";

        balloon.style.fontSize =
        random(30,70) + "px";

        container.appendChild(
            balloon
        );
    }
}

/* ====================================
   CAKE PAGE
==================================== */

function openCakePage(){

    cakeCut = false;

    showPage("cakePage");

    document.querySelector(".cake").style.display = "flex";

    document.getElementById("wholeCake").style.display = "block";

    document
        .querySelectorAll(".cake-piece")
        .forEach(piece => piece.classList.add("hidden"));
}

function cutCake(){

    if(!cakeCut){

        const cake =
        document.getElementById("wholeCake");

        cake.style.transition = "0.5s";
        cake.style.transform = "scale(1.15)";

        setTimeout(() => {

            cake.style.display = "none";

            document
            .querySelectorAll(".cake-piece")
            .forEach(piece =>
                piece.classList.remove("hidden")
            );

            createConfetti();

        }, 500);

        cakeCut = true;
        return;
    }

    // Hide the cake and pieces before popup
    document.querySelector(".cake").style.display = "none";

    document.getElementById("cakeMessageText").innerHTML =
        CONFIG.cakeMessage || "🎂 Happy Birthday! 🎂";

    document.getElementById("cakePopup")
        .classList.remove("hidden");
}

function closeCakePopup(){

    document
        .getElementById("cakePopup")
        .classList
        .add("hidden");

    // Hide cake pieces
    document
        .querySelectorAll(".cake-piece")
        .forEach(piece => piece.classList.add("hidden"));

    // Hide cake container
    document
        .querySelector(".cake")
        .style.display = "none";

    openLetterPage();
}

/* ====================================
   CONFETTI
==================================== */

function createConfetti(){

    const container =
    document.getElementById(
        "confettiContainer"
    );

    for(let i=0;i<120;i++){

        const confetti =
        document.createElement(
            "div"
        );

        confetti.className =
        "confetti";

        confetti.style.left =
        random(0,100) + "vw";

        confetti.style.background =
        randomColor();

        confetti.style.animationDuration =
        random(2,5) + "s";

        container.appendChild(
            confetti
        );

        setTimeout(() => {

            confetti.remove();

        }, 5000);
    }
}

/* ====================================
   LETTER PAGE
==================================== */

function openLetterPage(){

    showPage("letterPage");

    typeBirthdayLetter();
}
/* ====================================
   BIRTHDAY LETTER
==================================== */

function typeBirthdayLetter(){

    const element =
    document.getElementById(
        "birthdayLetter"
    );

    const text =
    CONFIG.birthdayLetter ||
    `Happy Birthday 💖

May your day be filled with happiness,
laughter, beautiful memories,
and countless reasons to smile.

Thank you for being such an amazing
person. Never stop shining and
being yourself. 🌸✨`;

    element.innerHTML = "";

    let index = 0;

    const timer =
    setInterval(() => {

        if(index < text.length){

            element.innerHTML +=
            text.charAt(index);

            index++;

        }
        else{

            clearInterval(timer);

        }

    }, 40);
}

function openThankYouPage(){

    showPage("thankPage");
}

/* ====================================
   HEART EFFECT
==================================== */

function createHearts(){

    const container =
    document.getElementById(
        "heartContainer"
    );

    for(let i=0;i<15;i++){

        const heart =
        document.createElement(
            "div"
        );

        heart.className =
        "heart";

        heart.innerHTML = "💖";

        heart.style.left =
        random(10,90) + "vw";

        heart.style.top =
        random(40,80) + "vh";

        heart.style.fontSize =
        random(15,35) + "px";

        container.appendChild(
            heart
        );

        setTimeout(() => {

            heart.remove();

        }, 5000);
    }
}

/* ====================================
   SPARKLES
==================================== */

function createSparkles(){

    const container =
    document.getElementById(
        "sparkleContainer"
    );

    setInterval(() => {

        const sparkle =
        document.createElement(
            "div"
        );

        sparkle.className =
        "sparkle";

        sparkle.innerHTML = "✨";

        sparkle.style.left =
        random(0,100) + "vw";

        sparkle.style.top =
        random(0,100) + "vh";

        sparkle.style.fontSize =
        random(10,25) + "px";

        container.appendChild(
            sparkle
        );

        setTimeout(() => {

            sparkle.remove();

        }, 3000);

    }, 500);
}

/* ====================================
   SAKURA PETALS
==================================== */

function createPetals(){

    const container =
    document.getElementById(
        "sakuraContainer"
    );

    setInterval(() => {

        const petal =
        document.createElement(
            "div"
        );

        petal.className =
        "petal";

        petal.innerHTML = "🌸";

        petal.style.left =
        Math.random() * 100 + "vw";

        petal.style.fontSize =
        random(15,35) + "px";

        petal.style.animationDuration =
        random(5,12) + "s";

        container.appendChild(
            petal
        );

        setTimeout(() => {

            petal.remove();

        }, 12000);

    }, 400);
}
/* ====================================
   INITIALIZATION
==================================== */

function initializeEffects(){

    createPetals();

    createSparkles();

    createHearts();
}

/* ====================================
   AUTO START EFFECTS
==================================== */

window.addEventListener(
    "load",
    () => {

        initializeEffects();

    }
);

/* ====================================
   KEYBOARD SUPPORT
==================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if(
            event.key === "Enter" &&
            document
            .getElementById("passwordPage")
            .classList.contains("active")
        ){

            checkPassword();
        }

    }
);

/* ====================================
   MEMORY BUTTON SAFETY
==================================== */

/* ====================================
   OPTIONAL MUSIC TOGGLE
==================================== */

function toggleMusic(){

    if(!music) return;

    if(music.paused){

        music.play();

    }
    else{

        music.pause();

    }
}

/* ====================================
   CLICK EFFECT
==================================== */

document.addEventListener(
    "click",
    (e) => {

        const sparkle =
        document.createElement("div");

        sparkle.className =
        "sparkle";

        sparkle.innerHTML = "✨";

        sparkle.style.left =
        e.clientX + "px";

        sparkle.style.top =
        e.clientY + "px";

        document
        .getElementById(
            "sparkleContainer"
        )
        .appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 2000);
    }
);

/* ====================================
   DEBUG CHECK
==================================== */

console.log(
    "🎂 Birthday Website Loaded Successfully 🌸"
);
