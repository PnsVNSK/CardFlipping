const cards = document.querySelectorAll('.card');
const resetBtn = document.getElementById('resetBtn');

let hasFlippedCards = false;
let Card1,Card2;
let lockBoard = false;

cards.forEach(card=> card.addEventListener('click',flipCard));
resetBtn.addEventListener('click', () => {
    cards.forEach(card => card.classList.remove('flip'));
    shuffle();
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard));
});


function flipCard(){
    if(lockBoard) return;
    this.classList.toggle('flip');
    
    if(hasFlippedCards == false){
        hasFlippedCards = true;
        Card1 = this;
        console.log(hasFlippedCards,Card1);
        return;
    }
    hasFlippedCards = false;
    Card2 = this;
    check();
}

function check(){
    if(Card1.dataset.name == Card2.dataset.name){
        disableCards();
    }
    else{
        unFlipCards();
    }
}

function disableCards(){
    Card1.removeEventListener('click',flipCard)
    Card2.removeEventListener('click',flipCard)
    resetBoard();
}

function unFlipCards(){
    lockBoard = true;
    setTimeout(()=>{
        Card1.classList.remove('flip');
        Card2.classList.remove('flip');
        resetBoard();
    },1000)
}

function resetBoard(){
    [hasFlippedCards,lockBoard] = [false,false];
    [Card1,Card2] = [null,null]
}

function shuffle(){
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
}
shuffle();
