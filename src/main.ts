import './styles/styles.scss'
import { backGroundMusic,wordComplete,jumpNoise,typeNoise,losingNoise,menuMusic } from './audio'
import { wordsArrayLevel } from './data'
import inGameBackgroundImage from '../public/media/modified_underground_space_with_gap.png'
import loadingBackgroundImage from '../public/media/sky.webp'
import unMutePic from '../public/media/unmute.svg'
import mutePic from '../public/media/mute.svg'

const player = document.querySelector<HTMLDivElement>('.player')
const block = document.querySelector<HTMLDivElement>('.block')
const rock = document.querySelector<HTMLImageElement>('.block--img')
const scoreNumb = document.querySelector<HTMLParagraphElement>('.score--number')
const gameContainer = document.querySelector<HTMLDivElement>('.main-display-container')
const menu = document.querySelector<HTMLDivElement>('.game-start')
const menuBtn = document.querySelector<HTMLButtonElement>('.game-start__btn')
const gameTextContainer = document.querySelector<HTMLDivElement>('.game-start__text')
const menuTextHighscore = document.querySelector<HTMLParagraphElement>('.game-start__text--highscore')
const menuTextScore = document.querySelector<HTMLParagraphElement>('.game-start__text--currentscore')
const body = document.querySelector<HTMLBodyElement>('body')
const mute = document.querySelector<HTMLImageElement>('.game-start__mute')

if(!player|| !block || !rock || !scoreNumb || !gameContainer || !menu || !menuBtn || !menuTextHighscore || !menuTextScore || !body || !gameTextContainer || !mute){
  throw new Error(`it didnt work`)
}

let word: string[] = []
let score: number = 0;
let isGameActive: boolean = false;
let rockObstacle: boolean = true;
let wordCleared:number = 0;
let level:number = 0;
let highScore:number = 0;
let isMute:boolean = true;


const randomWordGen = (arrayOfWords:string[][]) => {
  if(level < arrayOfWords.length){
    const currArr: string[] = arrayOfWords[level]
    const randomNumb:number =  Math.floor(Math.random() * currArr.length)
    word = currArr[randomNumb].split('')
  }
}

const handleHighscore = () => {
  if(score>highScore){
    highScore = score
  }
}

const handleLevelUp = () => {
  ++wordCleared 
  if(wordCleared % 2 === 0 && score !== 0){
    level ++
  }
}

const handleScoreUpdate = () => {
  scoreNumb.innerText = score.toString()
}

const handleGameLoss = (reason:string) => {
  if(isGameActive){
    isGameActive = false
    let losingText = document.querySelector<HTMLParagraphElement>('.losing-text');
    if (!losingText) {
      losingText = document.createElement('p');
      losingText.classList.add('losing-text');
      gameTextContainer.appendChild(losingText);
    }
    if(reason === 'rockCollision'){
      losingText.innerText = 'you miss timed your jump!'
    }
    if(reason === 'typing'){
      losingText.innerText = 'you typed the wrong letter!'
    }
    if(reason === 'wordCollision'){
      losingText.innerText = 'you didnt type fast enough!'
    }
    if( score >= highScore){
      menuTextHighscore.innerText =  `New Highscore !!!`
      menuTextScore.innerText = `${score}`
    } else {
      menuTextScore.innerText = `Score: ${score}`
      menuTextHighscore.innerText =  `HighScore: ${highScore}`
    }
    gameContainer.style.display = 'none'
    menu.style.display = 'flex'
    backGroundMusic.pause(); 
    backGroundMusic.currentTime = 0;
    losingNoise.play();
    body.style.backgroundImage = `url(${loadingBackgroundImage})`
    body.style.backgroundRepeat = 'repeat' 
    handleObstacleChangeToRock()
    handleHighscore()
    score = 0
    handleScoreUpdate()
    wordCleared = 0
    level = 0
    randomWordGen(wordsArrayLevel)
    setTimeout(() => {
      menuMusic.play()
    },1750)
  }
}

const handleGameStart = () => {
  if(!isGameActive){
    isGameActive = true
    gameContainer.style.display = 'block'
    menu.style.display = 'none'
    body.style.backgroundImage = `url(${inGameBackgroundImage})`
    body.style.backgroundRepeat = 'repeat-x' 
    backGroundMusic.play()
    menuMusic.pause()
    menuMusic.currentTime = 0
    randomWordGen(wordsArrayLevel)
  }
}

const handleMute = () => {
  if(!isMute){
    backGroundMusic.volume = 0
    wordComplete.volume = 0
    jumpNoise.volume = 0
    typeNoise.volume = 0
    losingNoise.volume = 0
    menuMusic.volume = 0
    menuMusic.pause()
    mute.src = `${mutePic}`
    isMute = true
  }else if(isMute){
    backGroundMusic.volume = 1
    wordComplete.volume = 1
    jumpNoise.volume = 1
    typeNoise.volume = 1
    losingNoise.volume = 1
    menuMusic.volume = 1
    menuMusic.currentTime = 0
    menuMusic.play()
    mute.src = `${unMutePic}`
    isMute = false
  }
}

const handleObstacleChangeToWord = () => {
  if(rockObstacle){
    rockObstacle = false
    block.innerText = word.join('')
    block.classList.add('slow-obstacle')
    block.style.display = 'block'
    rock.classList.remove('obstacle')
    rock.style.display = 'none'
  }
}

const handleObstacleChangeToRock = () => {
  if(!rockObstacle){
    rockObstacle = true
    rock.classList.add('obstacle')
    rock.style.display = 'block'
    block.classList.remove('slow-obstacle')
    block.style.display = 'none'
  }
}

const handleJump = () => {
  if(rockObstacle && isGameActive){
    if(!player.classList.contains('jump')){
      player.classList.add('jump')
      jumpNoise.play()
      score ++
      setTimeout(() => {
        player.classList.remove('jump')
        handleScoreUpdate()
      }, 1000);
    }
  }
}

const handleSpaceJump = (event: KeyboardEvent) => {
  if(rockObstacle && isGameActive){
    if(event.code ==='Space') {
      event.preventDefault();
      handleJump()
    }
  }
}

const handleTyping = (event: KeyboardEvent) => {
  if(!rockObstacle) {
    const currentLetter = word[0]
    if (event.key === currentLetter){
      typeNoise.currentTime = 0;
      typeNoise.play()
      word.shift()
      block.innerText = word.join('')
      if(word.length === 0){
        wordComplete.play()
        score++
        handleScoreUpdate()
        handleLevelUp()
        randomWordGen(wordsArrayLevel)
      }
    } else {
      handleGameLoss('typing')
    }  
  }
}

const handleClickWord = () => {
  if(!rockObstacle){
    typeNoise.pause()
    typeNoise.currentTime = 0;
    typeNoise.play()
    word.shift()
    block.innerText = word.join('')
    if(word.length === 0){
      wordComplete.play()
      score++
      handleScoreUpdate()
      handleLevelUp()
      randomWordGen(wordsArrayLevel)
    }
  }
}

setInterval(() => {
  const playerPositionTop = player.offsetTop as number
  const wordPositionLeft = block.offsetLeft as number
  const rockPositionLeft = rock.offsetLeft as number 
  if(playerPositionTop > 200  && (rockPositionLeft < 30 && rockPositionLeft > 10)){
    handleGameLoss('rockCollision')
  } else if(wordPositionLeft < 50 && wordPositionLeft > 10){
    handleGameLoss('wordCollision')
  }
  if(rockPositionLeft < -40){
    if(score !== 0 && score % 4 === 0){
      handleObstacleChangeToWord()
    }
  }
  if(score % 4 !== 0){
    handleObstacleChangeToRock()
  }
}, 10)




menuBtn.addEventListener('click', handleGameStart)
block.addEventListener('click', handleClickWord)
mute.addEventListener('click', handleMute)
document.addEventListener('click', handleJump)
document.addEventListener('keydown', handleSpaceJump)
document.addEventListener('keydown', handleTyping)

