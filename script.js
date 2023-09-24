const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 3;
const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "layer-5.png";

window.addEventListener("load", () => {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;
  const currentGameSpeed = document.getElementById("showGameSpeed");
  currentGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", (e) => {
    gameSpeed = e.target.value;
    currentGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(imageName, speedMultiplier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.x2 = this.width;
      this.image = imageName;
      this.speedMultiplier = speedMultiplier;
      this.speed = gameSpeed * this.speedMultiplier;
    }

    update() {
      this.speed = gameSpeed * this.speedMultiplier;
      if (this.x <= -this.width) {
        this.x = this.width + this.x2 - this.speed;
      }
      if (this.x2 <= -this.width) {
        this.x2 = this.width + this.x - this.speed;
      }
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
  }

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((layer) => {
      layer.update();
      layer.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});

// Idle animation code
// let playerState = "idle";
// const dropDown = document.getElementById("animations");
// dropDown.addEventListener("change", (e) => {
//   playerState = e.target.value;
// });

// const playerImage = new Image();
// playerImage.src = "shadow_dog.png";
// const spriteWidth = 575;
// const spriteHeight = 523;
// let gameFrame = 0;
// const staggerFrame = 4;

// const spriteAnimations = [];
// const animationStates = [
//   {
//     name: "idle",
//     frames: 7,
//   },
//   {
//     name: "jump",
//     frames: 7,
//   },
//   {
//     name: "fall",
//     frames: 7,
//   },
//   {
//     name: "run",
//     frames: 9,
//   },
//   {
//     name: "dizzy",
//     frames: 11,
//   },
//   {
//     name: "sit",
//     frames: 5,
//   },
//   {
//     name: "roll",
//     frames: 7,
//   },
//   {
//     name: "bite",
//     frames: 7,
//   },
//   {
//     name: "ko",
//     frames: 12,
//   },
//   {
//     name: "getHit",
//     frames: 4,
//   },
// ];

// animationStates.forEach((state, index) => {
//   let frames = {
//     loc: [],
//   };
//   for (let j = 0; j < state.frames; j++) {
//     let positionX = j * spriteWidth;
//     let poistionY = index * spriteHeight;
//     frames.loc.push({ x: positionX, y: poistionY });
//   }
//   spriteAnimations[state.name] = frames;
// });

// console.log(spriteAnimations);

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   let positon =
//     Math.floor(gameFrame / staggerFrame) %
//     spriteAnimations[playerState].loc.length;
//   let frameX = spriteWidth * positon;
//   let frameY = spriteAnimations[playerState].loc[positon].y;
//   ctx.drawImage(
//     playerImage,
//     frameX,
//     frameY,
//     spriteWidth,
//     spriteHeight,
//     0,
//     0,
//     spriteWidth,
//     spriteHeight
//   );

//   gameFrame++;
//   requestAnimationFrame(animate);
// }
// animate();
