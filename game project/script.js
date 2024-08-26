//Define html element 
const board = document.getElementById('gameBoard');


//define game variables
 const gridSize =20; 
let snake= [{ x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay=200;

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
function setPosition(element,position ){
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
    return (x,y);
 }

 //moving the snake 
 function move(){
    const head = {...snake(0)};
    switch (direction) {
        case'up':
           head.x--; 
            break;
        case 'down':
            head.x++;
            break;
        case 'left':
            head.y--;
            break;
        case 'right':
            head.y++;
            break;   
        
    }
    snake.unshift (head);
   //snake.pop();

    if(head.x===food.x && Headers.y=== head.y){
        food =generateFood();
        clearInterval(); // remove the previous 
        gameInterval=setInterval(()=>{
            move();
            draw();
        },gameSpeedDelay);
    }
 }
 //test the moving
 setInterval(() => {
    move();
    draw();
 },200);