const box1=document.getElementById("box1");
const box2=document.getElementById("box2");
const box3=document.getElementById("box3");
const box4=document.getElementById("box4");
const box5=document.getElementById("box5");
const box6=document.getElementById("box6");
const box7=document.getElementById("box7");
const box8=document.getElementById("box8");
const box9=document.getElementById("box9");

const computer=document.querySelector(".computer")
const score=document.querySelector(".score")
const person=document.querySelector(".person")
const start=document.querySelector(".start")
const heading=document.querySelector(".heading");
const playagain=document.querySelector(".playagain");

const arr=[box1,box2,box3,box4,box5,box6,box7,box8,box9]
const arr2=[[box1,box2,box3],[box4,box5,box6],[box7,box8,box9]]

// winnercombos for game
const winnercombo=[
    [box1,box2,box3],  //row1
    [box4,box5,box6],   //row2
    [box7,box8,box9],
    [box1,box4,box7],   //col1
    [box2,box5,box8],
    [box3,box6,box9],
    [box1,box5,box9],   //diagonal
    [box3,box5,box7]
]

let startgame=false;
let computergame=true;
let player1=true;
let player2=false;
let tie=false;
let computercount=0;
let person1Count=0;
let person2Count=0;


// when user click playagain button it should reset the game to intiall state
playagain.addEventListener("click",function(e){
    reset();
    startgame=false;
})
// it is not implemented yet
// checking for tie
const checkTie= function (){
    if(winnercombo.every((combo)=>combo.every(box=>box.textContent==="X")) || winnercombo.every((combo)=>combo.every(box=>box.textContent==="y")) ) {
    heading.innerHTML="<h1> Game Tie 🙄</h1>"
    reset();}
    
}
// checking winnning
const checkingwinn=function(player){
    return winnercombo.some((combo)=>combo.every(box=>box.textContent===player));
}
// reset function to reset the game
const reset=function(){
    for(let box of arr){
        box.textContent="";
    }
}
// computer game
const computermove=function(){
    // check if computer can win
   
    for(let combo of winnercombo){
        let count=combo.filter(box=>box.textContent==="O").length;
        let emptybox=combo.find(box=>box.textContent==="");
        if(count==2 && emptybox){
            emptybox.style.color="yellow"
            emptybox.textContent="O";
            return;
           
            
        }
    }
    // check if player can win and block
    for(let combo of winnercombo){
        let count=combo.filter(box=>box.textContent==="X").length;
        let emptybox=combo.find(box=>box.textContent==="");
        if(count==2 && emptybox){
            emptybox.style.color="yellow"
            emptybox.textContent="O";
            return;
        }
        

    }
    // random move cause no player win and no computer win
    let emptyBoxes=arr.filter(box=>box.textContent==="");
    if(emptyBoxes.length>0 ){
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.style.color="yellow"
        randomBox.textContent = "O";
        
    }
}
// start game
start.addEventListener("click",function(e){
    startgame=true;
})

// selecting computer
computer.addEventListener("click",function(e){
    if(computergame){
        computergame=false;
        computer.innerHTML="player2";
    }else {
        computergame=true;
        computer.innerHTML="computer";
    }
})
arr.forEach((box)=>{
    box.addEventListener("click",function(e){
        // check user has clicked start button or not
        
        if(startgame && computergame){
                if(box.textContent===""){
                    box.style.color="red";
                    box.textContent="X";
                    
                }

                    // checkin winning for player
                    if(checkingwinn("X")){
                        alert("player1 winn!");
                        
                        heading.innerHTML="<h1>OOps Computer looses😁</h1>";
                        person1Count++;
                        computer.innerHTML=`Computer-${computercount}`
                        person.innerHTML=`Person1-${person1Count}`

                        setTimeout(reset,1000);
                        return;
                        

                    }
                    // computer turns
                    setTimeout(() => {
                        computermove();
                    
                        // Now check after the computer has made its move
                        setTimeout(() => {
                            if (checkingwinn("O")) {
                                alert("computer winn!");
                                heading.innerHTML = "<h1>OOps Player1 looses 😥</h1>";
                                computercount++;
                                computer.innerHTML = `Computer-${computercount}`;
                                person.innerHTML = `Person1-${person1Count}`;
                                setTimeout(reset, 1000);
                                return;
                            }
                        }, 100); // Small delay to ensure UI updates
                    }, 500);
                    
                 
                
        } else if(startgame && !computergame){
            if(box.textContent==="" && player1){
                player2=true;
                player1=false;
                box.style.color="red";
                box.textContent="X";
                // checkin winning for player
                if(checkingwinn("X")){
                alert("player1 winn!");
                // setTimeout(reset,2000);
                heading.innerHTML="<h1>OOps Player2 looses 😥</h1>";
                person1Count++;
                    computer.innerHTML=`Person2-${person2Count}`
                    person.innerHTML=`Person1-${person1Count}`
                setTimeout(reset,1000);
                return;
                }
            }else{
                if(box.textContent==="" && player2){
                    player1=true;
                    player2=false;
                    box.style.color="yellow";
                    box.textContent="O";
                    // checkin winning for player
                    if(checkingwinn("O")){
                    alert("player2 winn!");
                    // setTimeout(reset,2000);
                    heading.innerHTML="<h1>OOps Player1 looses 😥</h1>";
                    person2Count++;
                    computer.innerHTML=`Person2-${person2Count}`
                    person.innerHTML=`Person1-${person1Count}`
                    setTimeout(reset,1000);
                    return;
                    }

                }
            }
            
        }
        else{
            alert("game has not started!");
        }
        
    });
    
});







