
//board things
let size = 25;
let rows = 25;
let columns = 25;
let board;
let context;

//snake things
let snakeX = size * Math.floor(Math.random() * (size - 1));
let snakeY = size * Math.floor(Math.random() * (size - 1));
let velocityX = 0;
let velocityY = 0;
let snake = [];

//apple (food)
let appleX = size * Math.floor(Math.random() * (size - 1));
let appleY = size * Math.floor(Math.random() * (size - 1));


let lost = false;

window.onload = function() {
    board = document.querySelector('canvas');
    board.height = rows * size;
    board.width = columns * size;
    context = board.getContext('2d');
    placeApple();
    document.onkeyup = changeDirection;
    setInterval(update, 100); // Meaning the snake will move 10 blocks each second;
}

function update() {
    if(lost){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(appleX, appleY, size, size);

    if(snakeX == appleX && snakeY == appleY){
        snake.push([appleX, appleY]);
        placeApple();
    }
    
    for(let i = snake.length - 1; i>0; i--){
        snake[i] = snake[i-1];
    }

    if(snake.length){
        snake[0] = [snakeX, snakeY]
    }

    context.fillStyle = "green";
    snakeX += velocityX * size;
    snakeY += velocityY * size;
    context.fillRect(snakeX, snakeY, size, size);

    for(let i = 0; i<snake.length; i++){
        context.fillRect(snake[i][0], snake[i][1], size, size)
    }

    //losing part (conditions)
    if(snakeX < 0 || snakeY < 0 || snakeX > columns*size || snakeY > rows*size){
        lost = true;
        alert("You Lost!")
    }

    for(let i = 0; i < snake.length; i++){
        if(snakeX == snake[i][0] && snakeY == snake[i][1]){
            lost = true;
            alert("You Lost!")
        }
    }
}

function placeApple(){
    appleX = size * Math.floor(Math.random() * (size - 1));
    appleY = size * Math.floor(Math.random() * (size - 1));
}

function changeDirection(e){
    if(e.code == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
        console.log('test')
    }
    else if(e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
        console.log('test')
    }
    else if(e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
        console.log('test')
    }
    else if(e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
        console.log('test')
    }
}