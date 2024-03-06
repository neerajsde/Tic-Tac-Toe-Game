const playerInfo = document.querySelector('.player-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.new-game-btn');

let currentPlayer;
let gameGrid;
const winngPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.textContent = "";
        boxes[index].classList.remove('disable');
        boxes[index].classList.remove('win');
    });
    playerInfo.textContent = `Current Player - ${currentPlayer}`;
    newGameBtn.classList.remove('active');
}

function swapPlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    playerInfo.textContent = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answere = "";
    
    winngPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]))){
                
                if(gameGrid[position[0]] === "X"){
                    answere = "X";
                }
                else{
                    answere = "O";
                }
                // disable pointer
                boxes.forEach((box) => {
                    box.classList.add('disable');
                });

                boxes[position[0]].classList.add('win');
                boxes[position[1]].classList.add('win');
                boxes[position[2]].classList.add('win');
        }
    });

    if(answere !== ""){
        newGameBtn.classList.add('active');
        playerInfo.textContent = `Winner Player - ${answere}`;
        return;
    }
    
    let count = 0;
    boxes.forEach((box, index) => {
        if(box.textContent !== ""){
            count++;
        }
    });
    if(count === 9){
        playerInfo.textContent = `Game Tied !`;
        newGameBtn.classList.add('active');
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        gameGrid[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;
        boxes[index].classList.add('disable');
        swapPlayer();
        checkGameOver();
    }
}

// event listner
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
newGameBtn.addEventListener("click", () => {
    initGame();
});

initGame();