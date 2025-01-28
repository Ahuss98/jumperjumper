import './styles/styles.scss'
import { backGroundMusic,wordComplete,jumpNoise,typeNoise,losingNoise } from './audio'
import { wordsArrayLevel } from './data'
import inGameBackgroundImage from '../public/media/modified_underground_space_with_gap.png'
import loadingBackgroundImage from '../public/media/sky.webp'

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

if(!player|| !block || !rock || !scoreNumb || !gameContainer || !menu || !menuBtn || !menuTextHighscore || !menuTextScore || !body || !gameTextContainer){
  throw new Error(`it didnt work`)
}

let word: string[] = []
let score: number = 0;
let isGameActive: boolean = false
let rockObstacle: boolean = true
let wordCleared:number = 0
let level:number = 0 
let highScore:number = 0 

const randomWordGen = (arrayOfWords:string[][]) => {
  if(level < arrayOfWords.length){
    const currArr: string[] = arrayOfWords[level]
    const randomNumb:number =  Math.floor(Math.random() * currArr.length)
    word = currArr[randomNumb].split('')
  }
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
    if(reason === 'collision'){
      losingText.innerText = 'you missed timed your jump'
    }
    if(reason === 'typing'){
      losingText.innerText = 'you typed the wrong letter'
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
  }
}

const handlemenu = () => {
  if(!isGameActive){
  isGameActive = true
  gameContainer.style.display = 'block'
  menu.style.display = 'none'
  body.style.backgroundImage = `url(${inGameBackgroundImage})`
  body.style.backgroundRepeat = 'repeat-x' 
  backGroundMusic.play()
  randomWordGen(wordsArrayLevel)
}
}

const handleHighscore = () => {
  if(score>highScore){
    highScore = score
  }
}

const handleLevelUp = () => {
  if(wordCleared % 2 === 0 && score !== 0){
  level ++
  }
}

const handleScoreUpdate = () => {
  scoreNumb.innerText = score.toString()
}

const handleObstacleChangeToWord = () => {
  if(rockObstacle){
    block.innerText = word.join('')
    block.classList.add('slow-obstacle')
    rock.classList.remove('obstacle')
    rock.style.display = 'none'
    block.style.display = 'block'
    rockObstacle = false
  }}

const handleObstacleChangeToRock = () => {
  if(!rockObstacle){
  rock.classList.add('obstacle')
  block.classList.remove('slow-obstacle')
  block.style.display = 'none'
  rock.style.display = 'block'
  rockObstacle = true
  }
}

const handleJump = () => {
  if(rockObstacle){
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
  if(rockObstacle){
    if(event.code ==='Space') {
      event.preventDefault();
      handleJump()
    }
  }
}

const handleTyping = (event: KeyboardEvent) => {
  let currentIndex:number = 0
  if(!rockObstacle) {
      const currentLetter = word[currentIndex]
    if (event.key === currentLetter){
      typeNoise.currentTime = 0;
      typeNoise.play()
      word.shift()
      block.innerText = word.join('')
      handleScoreUpdate()
      if(word.length === 0){
        wordComplete.play()
        score++
        ++wordCleared 
        handleScoreUpdate()
        handleLevelUp()
        randomWordGen(wordsArrayLevel)
      }
    } else {
      handleGameLoss('typing')
      handleHighscore()
      score = 0
      wordCleared = 0
      level = 0
      currentIndex = 0;
      randomWordGen(wordsArrayLevel)
      handleObstacleChangeToRock()
      handleScoreUpdate()
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
    handleScoreUpdate()
    if(word.length === 0){
      wordComplete.play()
      score++
      ++wordCleared 
      handleScoreUpdate()
      handleLevelUp()
      randomWordGen(wordsArrayLevel)
    }
  }
}

  setInterval(() => {
    const playerPositionTop = player.offsetTop as number
    const blockPositionLeft = block.offsetLeft as number
    const rockPositionLeft = rock.offsetLeft as number 
  if(playerPositionTop > 200  && (rockPositionLeft < 30 && rockPositionLeft > 10) || blockPositionLeft < 50 && blockPositionLeft > 10){
    handleHighscore()
    handleGameLoss('collision')
    score = 0
    wordCleared = 0
    level = 0
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


menuBtn.addEventListener('click',handlemenu)
block.addEventListener('click',handleClickWord)
document.addEventListener('click', handleJump)
document.addEventListener('keydown',handleSpaceJump)
document.addEventListener('keydown',handleTyping)

