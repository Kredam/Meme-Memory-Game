let cards=[
    {name: "hanyfokos", img:"./Cards/hanyfokos.png"},
    {name: "hanyfokos", img:"./Cards/hanyfokos.png"},
    {name: "tippmixcsaba", img:"./Cards/tippmixcsaba.png"},
    {name: "tippmixcsaba", img:"./Cards/tippmixcsaba.png"},
    {name: "legyentanc", img:"./Cards/legyentanc.png"},
    {name: "legyentanc", img:"./Cards/legyentanc.png"},
    {name: "pepsibela", img:"./Cards/pepsibela.png"},
    {name: "pepsibela", img:"./Cards/pepsibela.png"},
    {name: "erera", img:"./Cards/erera.png"},
    {name: "erera", img:"./Cards/erera.png"}
];

let selectedCardIndex = [];
let selectedCard = [];
let cardsFound =0;
let minute;
let second;

let board = document.querySelector(".board");
let leaderboard = document.getElementById("players");
var timer;
var playerName;
var player;

$(document).ready(function () {
    playerName = prompt("Please enter your name!");
    player = document.createElement("li");
    player.setAttribute("id", "player");
    leaderboard.appendChild(player);
    startTimer();
    createBoard(board, cards);
    shuffleCards(cards);
    images = document.querySelectorAll("img");
    Array.from(images).forEach(img =>
        img.addEventListener("click", flipCard))
});

function startTimer(){
    second=0;
    minute=0;
    timer = setInterval(() => {
        if(second === 60){
            minute++;
            second=0;
        }
        document.getElementById("timerCounter").innerHTML = "minutes: " + minute + " seconds: "+second;
        second++;
    }, 1000);
}

function createBoard(board, array){
    for (let index = 0; index < array.length; index++) {
        let img = document.createElement("img");
        img.setAttribute("src", "./Cards/blank.jpg");
        img.setAttribute("width", "85px");
        img.setAttribute("height", "150px")
        img.setAttribute("data-index", index);
        board.appendChild(img);
    }
}

function shuffleCards(array){
    let amountToShuffle = cards.length;
    for (let index = 0; index < array.length; index++) {
        randomIndex = Math.floor(Math.random()*amountToShuffle);
        temp = array[index];
        array[index]=array[randomIndex]
        array[randomIndex] = temp;
    }
}

function flipCard(){
    let selected = this.dataset.index;
    selectedCard.push(cards[selected]);
    selectedCardIndex.push(selected);
    this.setAttribute("src", cards[selected].img)
    audioForCard(selected);
    this.classList.add("flip");
    if(selectedCard.length === 2){
        setTimeout(pairFound, 500);
    }
}
function audioForCard(index){
    if(cards[index].name === "hanyfokos"){
        document.getElementById("hanyfokos").play();
    }
    if(cards[index].name === "tippmixcsaba"){
        document.getElementById("tippmixcsaba").play();
    }
    if(cards[index].name === "legyentanc"){
        document.getElementById("legyentanc").play();
    }
    if(cards[index].name === "pepsibela"){
        document.getElementById("pepsibela").play();
    }
    if(cards[index].name === "erera"){
        document.getElementById("erera").play();
    }
}
function pairFound(){
    let images = document.querySelectorAll("img");
    let numeroUno = selectedCardIndex[0];
    let des = selectedCardIndex[1];
    if(selectedCard[0].name === selectedCard[1].name && numeroUno !== des){
        cardsFound++;
        images[numeroUno].style.display = "none";
        images[des].style.display = "none";
        alert("you have found a match");
        checkWin();
    }else{
        images[numeroUno].setAttribute("src", "./Cards/blank.jpg");
        images[des].setAttribute("src", "./Cards/blank.jpg");
    }
    selectedCard = [];
    selectedCardIndex = [];
}

function restartGame(){
    playerName = prompt("Please enter your name!");
    cardsFound =0;
    board.innerHTML = "";
    clearInterval(timer);
    startTimer();
    createBoard(board, cards);
    shuffleCards(cards);
    images = document.querySelectorAll("img");
    Array.from(images).forEach(img =>
        img.addEventListener("click", flipCard))
}

function checkWin(){
    if(cardsFound === cards.length/2){
        document.getElementById("player").innerHTML = playerName + " time: minutes: " + minute + " seconds: "+second;
        alert("YOU WON!");
        clearInterval(timer);
    }
}

