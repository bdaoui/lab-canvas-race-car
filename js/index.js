// This will initialize the canvas
// First we select it with a querySelector in this case but we could also use getElementByID, still better to use querySelector as it is less weird and does not behave in strange ways with high order functions

const canvas = document.querySelector("canvas");

// then we need to put some border on the canvas, either here or in the css. This will allow us to see the canvas on the html 

// 

canvas.style.border = "solid 2px red";

// CTX has been described to me as a "brush" used to paint on the canvas. I do not get it completely, its properties and mechanics are beyond me. I guess it's an innate method to canvas that is necessary for it to work. As for why and what it does, I have no idea.

let ctx = canvas.getContext("2d");

// This is needed to work with requestAnimationFrame. It keeeps track of the frames.

let intervalID = 0;
let isGameOver = false;

// set the score, it actually does not work at all without this

let score = 0;


// This will set the background
// Create a new variable and inject an immage class inside of it
// chanche the src path of the img 


let background = new Image();
background.src = "../images/road.png ";

// This will create a car model, using the same loigic of before

let car = new Image();
car.src = "../images/car.png";

// this are variables used to move the car, better than fix numbers. They can be changed on the fly. 

let carX = 250;
let carY = 400;
let carWidth = 80;
let carLength = 130;

// Enemey Car ---> still need to be drawn in the page before appearing. 

let obCar = new Image();
obCar.src = "../images/car.png";

let obCarX = 300;
let obCarY = -400;


// This function allow for startGame() to be initialized whenever someone click the start-button. 

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    
    
    startGame();
  };

  document.addEventListener("keydown", (event) =>
   { if(event.code ==="ArrowRight" && carX + carWidth < canvas.width -50){
    carX +=4;
  } else if( event.code === "ArrowLeft" && carX >50) {  
    carX -=4;
  } 
})

// This will maake start

  function startGame() {
 
// This will draw the background. 0 0 means that we want to start in the first upper corner. Then the last 2 parameters are the width and the height of the canvas, meaning that this immage will stretch along all the canvas. Naturally this is what we want becasue this is the background of the game.

    ctx.drawImage(background, 0,0,canvas.width, canvas.height);

    //This is the same thig, just with the car needed for the game.

    ctx.drawImage(car, carX, carY, carWidth, carLength);

    // Enemy cars drawing

    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);

    // movement

    obCarY += 2;
    if(obCarY > canvas.height){
      obCarY = -400;
      score++;
    }


    if(carY< obCarY + carLength && carX< obCarX + carWidth -5 && carX + carWidth > obCarX && carY + carLength > obCarY){

      isGameOver =true;
    
    }

    // Scoreboard
    //first determine the font and size

    ctx.font = "30px Georgia";

    // Then use the method fillText() - It needs the string that we want to show, and then x and y positions of the element that we want to display

    ctx.fillText(`Score: ${score}`, 100, 40);


    // It has to be stored inside a variable because otherwise it will just keep going at infinitum. They can be called recursive function because they keep calling themselves over and over again.

    intervalID = requestAnimationFrame(startGame);

    if(isGameOver){

      // This simply stop the animation frame 

      cancelAnimationFrame(intervalID);
    }
  }
};
