//Define html element 
const board = document.getElementById('gameBoard');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

//define game variables
 const gridSize =20; 
let snake= [{ x: 10, y: 10}];
let food = generateFood();
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
    const foodElement = createGameElement('div','food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
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
        clearInterval();
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
 }
