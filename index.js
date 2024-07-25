let gameSeq=[];
let userSeq=[];

let started="false";
let level=0;
let h2=document.querySelector("h2");

let btns=["red","yellow","purple","green"];


 document.addEventListener("keypress",function(){
if(started=="false"){
    console.log("Game has started");
    started="true";
    levelUp();
}
});

// let btns=document.querySelectorAll(".btn");
function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash");
    },250)

clickbtn();
};
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash")
    },250);
   
};

function levelUp(){
    userSeq=[];
    level++;
   
    h2.innerText=`level ${level}`;

    //random btn flash
    let randomIdx=Math.floor(Math.random()*4);
     let randColor=btns[randomIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    
    console.log(gameSeq);

   
    // console.log(randbtn);
    // console.log(random);

    gameFlash(randBtn);
};

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx] ){
        if(userSeq.length==gameSeq.length){
            console.log("correct");
            setTimeout(levelUp,500);
        }
       
    }
    else{
        h2.innerHTML=`Game Over ! your score was <b>${level}</b><br> Press any key to start`;
        
       // Disabled the clickEvent after the game has overed,because after the game has overed we would not want that our any button has been clickable
        let btnContainer=document.getElementById("btn-container");
        btnContainer.removeEventListener("click",btnPress)

        // Disabled the button
        let btns=document.querySelectorAll(".btn");
        btns.forEach(btn=>{
            btn.disabled=true;
            btn.removeEventListener("click",btnPress);

        })
        // change the color after when user enter the wrong button.
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
            backgroundColor="white"
        },250);
        reset();
    }
}

function btnPress(){
    if(started==="true"){
        
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");

    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);

};
    };
    
    // pressing btn by the user after generating the random button.
function clickbtn(){
    let allBtns=document.querySelectorAll(".btn");
    for( let btn of allBtns){
        btn.addEventListener("click",btnPress);
    };
}
    
// Reset the array when the user does click the wrong button then start from the beginning.
    function reset(){
        started="false";
        gameSeq=[];
        userSeq=[];
        level=0;
        let btnContainer=document.getElementById("btn-container");
        btnContainer.addEventListener("click",btnPress);
       
    };
