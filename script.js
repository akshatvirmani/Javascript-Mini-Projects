// Frist Challenge:Your age in days

function ageindays()
{
    var birthyear=prompt("What is your age...?Batana SUAR!");
    var ages=(2020-birthyear)*365;
    var h1=document.createElement('h1');
    var answer=document.createTextNode("You are " + ages + " Days Old!");
    h1.setAttribute('id','ageindays');
    h1.appendChild(answer);
    document.getElementById("flex-box-result").appendChild(h1); 
}
function reset()
{
    document.getElementById("ageindays").remove();
}
//Challenge 2:Generate Cat
function generateCat(){
    var image=document.createElement("img");
    var div=document.getElementById("flex-cat-gen");
    image.src="https://cdn2.thecatapi.com/images/34i.gif";
    div.appendChild(image);
}

//Challenge 3:Rock,Paper,Scissors
function rpsgame(yourChoice)
{
    console.log(yourChoice);
    var humanchoice,botchoice;
    humanchoice=yourChoice.id;
    botchoice=NumberToChoice(randtoRps());
    console.log("Computer choice:",botchoice);
    results=decideWinner(humanchoice,botchoice);//[0,1] human lost bot wins
    console.log(results);
    message=finalMessage(results);//{"message":YouWin}
    rpsFrontEnd(yourChoice.id,botchoice,message);
}
function randtoRps()
{
    return Math.floor(Math.random() * 3);

}
function NumberToChoice(number)
{
    return["rock","paper","scissors"][number];

}

function decideWinner(yourChoice,computerChoice)
{
    var rpsDatabase={
        "rock":{"scissors": 1,"rock":0.5,"paper":0},
        "paper":{"rock":1,"paper":0.5,"scissors":0},
        "scissors":{"paper":1,"scissors":0.5,"rock":0}

    };
    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var compuerScore=rpsDatabase[computerChoice][yourChoice];

    return [yourScore,compuerScore];

}

function finalMessage([yourScore, compuerScore]){
    if(yourScore===0)
    {
        return{"message":"You Lost!","color":"red"};
    }
    else if(yourScore==="0.5"){
        return{"message":"You Tied!","color":"yellow"};
    }
    else{
        return{"message":"You Won!","color":"green"};
    }


}

function rpsFrontEnd (humanImageChoice , botImageChoice , finalMessage) {
    var imagesDatabase={
        "rock":document.getElementById("rock").src,
        "paper":document.getElementById("paper").src,
        "scissors":document.getElementById("scissors").src
    }
        
    

//lets remove all the image
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv=document.createElement("div");
    var botDiv=document.createElement("div");
    var messageDiv=document.createElement("div");
    humanDiv.innerHTML="<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"

    messageDiv.innerHTML="<h1 style='color: " + finalMessage['color'] +"; font-size:60px; padding:30px; '>" + finalMessage["message"] + "</h1>" 
    botDiv.innerHTML="<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
    

}

//Challenge 4:Change the color of all button
var all_buttons=document.getElementsByTagName("button");

var copyAllButtons=[];
for(let i=0;i<all_buttons.length; i++)
{
    copyAllButtons.push(all_buttons[i].classList[1]);
}
function buttonColorChange(buttonlove)
{
    if(buttonlove.value==="red"){
        buttonsRed();
    }
    else if(buttonlove.value==="green"){
        buttonsGreen();
    }
    else if(buttonlove.value==="reset")
    {
        buttonColorReset();
    }
    else if(buttonlove.value==="random")
    {
        randomColors();
    }
}
function buttonsRed()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}
function buttonsGreen()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}
function buttonColorReset()
{
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColors()
{
    let choices=["btn-primary","btn-danger","btn-success","btn-warning"]
    for(let i=0;i<all_buttons.length;i++)
    {
        let randomNumber=Math.floor(Math.random*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}   

//Challenge 5:Blackjack
let blackjackgame={
    "you":{"scoreSpan":"#your-blackjack-result","div":"#your-box","score":0},
    "dealer":{"scoreSpan":"#dealer-blackjack-result","div":"#dealer-box","score":0},
    "cards":["2","3","4","5","6","7","8","9","10","K","Q","A","J"],
    "cardsMap":{"2": 2,"3": 3,"4":4 ,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"Q":10,"A":[1,11],"J":10},
    "wins":0,
    "losses":0,
    "draws":0,
    "isStand":false,
    "turnsOver":false,
};

const YOU=blackjackgame["you"]
const DEALER=blackjackgame["dealer"]
const hitSound=new Audio("sounds/swish.m4a");
const winSound=new Audio("sounds/cash.mp3");
const lossSound=new Audio("sounds/aww.mp3");

document.querySelector("#blackjack-hit").addEventListener("click",blackjackHit);
document.querySelector("#blackjack-stand").addEventListener("click",dealerLogic);
document.querySelector("#blackjack-deal").addEventListener("click",blackjackDeal);


function blackjackHit(){
    if(blackjackgame["isStand"]===false){
    let  card=randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
}
}
function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomIndex];
}
function showCard(card,activePlayer){
    if(activePlayer["score"]<=21){
        let cardImage=document.createElement("img");
        cardImage.src=`images/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
}
}
function blackjackDeal(){
    if(blackjackgame["turnsOver"]===true){
        blackjackgame["isStand"]=false;
        let yourImages=document.querySelector("#your-box").querySelectorAll("img");
        let dealerImages=document.querySelector("#dealer-box").querySelectorAll("img");

        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU["score"]=0;
        DEALER["score"]=0;
        document.querySelector("#your-blackjack-result").textContent=0;
        document.querySelector("#dealer-blackjack-result").textContent=0;

        document.querySelector("#your-blackjack-result").style.color="#ffffff";
        document.querySelector("#dealer-blackjack-result").style.color="#ffffff";

        document.querySelector("#blackjack-result").textContent="Let's Play!";
        document.querySelector("#blackjack-result").style.color="black";

        blackjackgame["turnsOver"]=true;
    }
}
function updateScore(card,activePlayer)
{
    if(card==="A"){
        //if adding 11 keeps score less than 21 add it otherwise add 1
        if(activePlayer["score"] +blackjackgame["cardsMap"][card][1]<=21){
            activePlayer["score"]+=blackjackgame["cardsMap"][card][1];
        } else{
        activePlayer["score"] +=blackjackgame["cardsMap"][card][0];
    }
    }else{
        activePlayer["score"]+=blackjackgame["cardsMap"][card];
    }
}



function showScore(activePlayer)
{
    if(activePlayer["score"]>21){
        document.querySelector(activePlayer["scoreSpan"]).textContent="BUST!";
        document.querySelector(activePlayer["scoreSpan"]).style.color="red";
    }else{
    document.querySelector(activePlayer["scoreSpan"]).textContent=activePlayer["score"];
}
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
async function dealerLogic(){
    blackjackgame["isStand"]=true;
    while(DEALER["score"]<16 && blackjackgame["isStand"]===true){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(1000);
    }
    
    blackjackgame["turnsOver"]=true;
    let winner=computeWinner();
    showResult(winner);
}

//compute winner and return who just won
function computeWinner(){
    let winner;

    if(YOU["score"]<=21){
        //higher score than dealer or when dealer busts but you don't
        if(YOU["score"]>DEALER["score"] || (DEALER["score"]>21)){
            blackjackgame["wins"]++;
            winner=YOU;

        }else if(YOU["score"]<DEALER["score"]){
            blackjackgame["losses"]++;
            winner=DEALER;
        }else if(YOU["score"]===DEALER["score"]){
            blackjackgame["draws"]++;
        }
        //when user  busts but dealer doesn't

    }else if(YOU["score"]>21 && DEALER["score"]<=21){
        blackjackgame["losses"]++;
        winner=DEALER;
        //when you and the dealer busts
    }else if(YOU["score"]>21 && DEALER["score"]>21){
        blackjackgame["draws"]++;
    }
    console.log(blackjackgame);
    return winner;
}         
function showResult(winner){
    let message,messageColor;
    if(blackjackgame["turnsOver"]===true){

        if(winner===YOU){
            document.querySelector("#wins").textContent=blackjackgame["wins"];
            message="You Won!";
            messageColor="green";
            winSound.play();
        }
        else if(winner===DEALER){
            document.querySelector("#losses").textContent=blackjackgame["losses"];
            message="You Lost!";
            messageColor="red";
            lossSound.play();
        }
        else{
            document.querySelector("#draws").textContent=blackjackgame["draws"];
            message="You Drew!";
            messageColor="black";
        }
        document.querySelector("#blackjack-result").textContent=message;
        document.querySelector("#blackjack-result").style.color=messageColor;
    }
}



