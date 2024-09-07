//Define html element 
const board = document.getElementById('gameBoard');
const instructionText = document.getElementById('instruction-text');
const score = document.getElementById('score');
const highScore=document.getElementById('highScore');


//define game variables
 const gridSize =20; 
let snake= [{ x: 10, y: 10}];
let food = generateFood();
let highScore=0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay=200;
let gameStarted = false ;

//draw game map,snake,food
function draw() {
    board.innerHTML ='';
    drawSnake();
    drawFood();
}

//draw snake 
function drawSnake() {
    snake.forEach(segment => {
      const snakeElement = createGameElement('div',
         'snake');  
      setPosition(snakeElement,segment);
      board.appendChild(snakeElement);
    });
}
// create snake or food/div
function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className = className ;
    return element ;  
}
// set the position of snake and food
function setPosition(element,position ) {
element.style.gridColumn = position.x;
element.style.gridRow = position.y;
}
//testing
//draw();

//draw food function 
 function drawFood(){
    if (gameStarted){
    const foodElement = createGameElement('div','food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
 }

//generate food
 function  generateFood() {
    const x = Math.floor (Math.random() * gridSize) + 1;
    const y = Math.floor (Math.random() * gridSize) + 1;
    return {x , y };
 }

 //moving the snake 
 function move(){
    const head = { ...snake[0] };
    switch (direction) {
        case'up':
           head.y--; 
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;   
        
    }
    snake.unshift (head);
  // snake.pop();

    if(head.x===food.x && head.y=== food.y){
        food =generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
    } else {
        snake.pop();

    }
 }
 //test the moving
 
  gameInterval=setInterval(() => {
    move();
    draw();
 },gameSpeedDelay); 
  
 //setInterval(()=>{
    //move();   //move first 
    //draw();   // draw again new position 

 //},200);

 //start the game 
 function startGame() {
   gameStarted= true; // keep track of the game 
   instructionText.style.display= 'none';
   logo.style.display= 'none';
   gameInterval=setInterval(()=>{
    move();
    checkcollisions();
    draw(); 
   },gameInterval);
 }
 //keypress event listener 
 function handleKeyPress(event) {
    if(
        (!gameStarted && event.code === 'space') ||
        (!gameStarted && event.key === '')
     ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = Up;
                break;
                case 'ArrowDown':
                    direction= Down;
                    break;
                case 'ArrowLeft':  
                direction= left;
                break;
                case 'ArrowRight':
                    direction = right ;
                    break;
        }
    }
 }
 document.addEventListener('keydown',handleKeyPress);

 function increaseSpeed(){
    //console.log(gameSpeedDelay);
    if(gameSpeedDelay>150){
        gameSpeedDelay-=5
    } else if(gameSpeedDelay>100){
        gameSpeedDelay-=3
    }
    else if (gameSpeedDelay>50){
        gameSpeedDelay-=2
    }
    else if (gameSpeedDelay>25){
        gameSpeedDelay-=1
    }
 }  

 function checkcollisions(){
    const head=snake[0];
    if (head.x<1 || head.x>gridSize || head.y<1 || head.y>gridSize ){
        resetGame();
    }
    for(let i =1 ; i<snake.length; i++ ){
        if (head.x===snake[i].x && head.y===snake[i].y){
            resetGame();
        }
    }
 }

 function resetGame(){
    updateHighScore();
    stopGame();
    snake[{x:10 , y:10 }];
    food=generateFood();
    direction='right';
    gameSpeedDelay=200;
    updateScore();
 }
 function updateScore(){
    const  currentScore=snake.length -1;
    snake.textContent=currentScore.toString(),padStart('3',0);
 }
 function stopGame(){
    clearInterval(gameInterval);
    gameStarted=false;
    instructionText.style.display ='block';
    logo.style.display ='block';
 } 
  function updateHighScore(){
    currentScore =snake.length-1;
    if (currentScore>highScore){
        highScore=currentScore;
        highScore.textContent=currentScore.toString(),padStart('3',0);
    }
    Highlight.style.display='block';
  }