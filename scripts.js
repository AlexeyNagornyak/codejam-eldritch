import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';

//card

const ancientsContainer = document.querySelector('.ancients-container');

ancientsData.forEach((el) => {
    const div = document.createElement('div');
    div.classList.add('ancient-card');
    div.style.backgroundImage = `url('${el.cardFace}')`;
    ancientsContainer.append(div);
})

const card = document.querySelectorAll('.ancient-card');

const activeCard = (num) => {
    card.forEach((el) => {
        el.classList.remove('active')
    })
    card[num].classList.add('active')
}

let visibleDiff = false;

card.forEach((el, i) => {
    el.addEventListener('click', (e) => {
        activeCard(i);
        if(e.target.classList.contein('active')){
            if(!visibleDiff){
                shuffleStages(i)
                dotsNum()
                createDifficulties() 
                visibleDiff = true;
                activeDifficulty()
            }
        }
    })
})

//difficulties

const difficultyContainer = document.querySelector('.difficulty-container');

const createDifficulties = () => {
    difficulties.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('difficulty');
        div.textContent = el.name;
        difficultyContainer.append(div);
    })
}

let visibleBtn = false;

const activeDifficulty = () => { 
    const difficulty = document.querySelectorAll('.difficulty');
    difficulty.forEach((el, i) => {
        el.addEventListener('click', () => {
            difficulty.forEach((el) => {
                el.classList.remove('diff-active')
            })
            difficulty[i].classList.add('diff-active')
            if(!visibleBtn) {
                createShuffleBtn()   
                visibleBtn = true
                clickShuffleBtn()
            }
        })     
    })
}

//shuffle-button

const deskContainer = document.querySelector('.desk-container');

const createShuffleBtn = () => {
    const div = document.createElement('div');
    div.classList.add('shuffle-btn');
    div.textContent = 'Замешать колоду';
    deskContainer.append(div);
}

const curentState = document.querySelector('.curent-state');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last-card');

const clickShuffleBtn = () => {
    const shuffleBtn = document.querySelector('.shuffle-btn');
    shuffleBtn.addEventListener('click', () => {
        curentState.classList.add('show');
        deck.classList.add('show');
        deck.style.backgroundImage = "url('./assets/mythicCardBackground.png')"
        lastCard.classList.add('show');
        shuffleBtn.style.display = 'none'
    })
}

const stageContainer = document.querySelectorAll('.stage-container');

import greenCardsData from './data/mythicCards/green/index.js';
import brownCardsData from './data/mythicCards/brown/index.js';
import blueCardsData from './data/mythicCards/blue/index.js';

const deckCard = []

const dotsNum = () => {
    stageContainer.forEach((el, i) => {
        const dotGreen = el.querySelector('.green');
        const dotBrown = el.querySelector('.brown');
        const dotBlue = el.querySelector('.blue');
        let green = []
        let brown = []
        let blue = []
        if(typeof deckCard[i] == 'undefined'){
            return
        }else{
            deckCard[i].forEach((el, n) => {
                let col = el.color
                if(col == 'green'){
                    green.push(el)
                }
                if(col == 'brown'){
                    brown.push(el)
                }
                if(col == 'blue'){
                    blue.push(el)
                }
            })
        }
        dotGreen.textContent = green.length
        dotBrown.textContent = brown.length
        dotBlue.textContent = blue.length
    })
}

const shuffleCards = (arrCard, len) => {
    let result = [];
    for (var i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * arrCard.length) 
        result.push(arrCard[rand]);
        arrCard.splice(rand, 1)
    }
    return result;
}

const getCardFromDeck = (arr) => {
    return deckCard.push(arr)
}

const shuffleStages = (cardNum) => {
    if(typeof cardNum == 'undefined'){
        return
    }else{
        for(let i = 0; i < 3; i++){
            let stage;
            if(i == 0){
                stage = ancientsData[cardNum].firstStage;
            }
            if(i == 1){
                stage = ancientsData[cardNum].secondStage;
            }
            if(i == 2){
                stage = ancientsData[cardNum].thirdStage;
            }
            let green = shuffleCards(greenCardsData, stage.greenCards)
            let brown = shuffleCards(brownCardsData, stage.brownCards)
            let blue = shuffleCards(blueCardsData, stage.blueCards)
            let level = [].concat(green, brown, blue)
            getCardFromDeck(level)
        }
    }
}
shuffleStages()
dotsNum()

const showLastCard = () => {
    for(let i = 0; i < deckCard.length; i++){
        if(deckCard.flat().length == 1){
            deck.style.visibility = 'hidden'
        }
        if(deckCard[i].length != 0){
            let b = shuffleCards(deckCard[i], 1)
            lastCard.style.backgroundImage = `url('${b[0].cardFace}')`
            dotsNum()
            return
        }
    }
}

deck.addEventListener('click', showLastCard)