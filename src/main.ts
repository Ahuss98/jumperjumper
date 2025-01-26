import './styles/styles.scss'
import gameMusic from '../public/sound/cottagecore-17463.mp3'
import finishedWord from '../public/sound/achievement-video-game-type-1-230515.mp3'
import JumpSound from '../public/sound/retro-jump-3-236683.mp3'
import typeSound from '../public/sound/retro-coin-1-236677.mp3'
import losingMusic from '../public/sound/failure-1-89170.mp3'
import inGameBackgroundImage from '../public/media/modified_underground_space_with_gap.png'
import loadingBackgroundImage from '../public/media/sky.webp'
import { wordsArrayLevel } from './data'

//grabs the html element with a classname of player
const player = document.querySelector<HTMLDivElement>('.player')
const block = document.querySelector<HTMLDivElement>('.block')
const rock = document.querySelector<HTMLImageElement>('.block--img')
const scoreNumb = document.querySelector<HTMLParagraphElement>('.score--number')
const gameContainer = document.querySelector<HTMLDivElement>('.main-display-container')
const gameStart = document.querySelector<HTMLDivElement>('.game-start')
const gameStartBtn = document.querySelector<HTMLButtonElement>('.game-start__btn')
const gameTextContainer = document.querySelector<HTMLDivElement>('.game-start__text')
const gameStartTextHighscore = document.querySelector<HTMLParagraphElement>('.game-start__text--highscore')
const gameStartTextScore = document.querySelector<HTMLParagraphElement>('.game-start__text--currentscore')
const body = document.querySelector<HTMLBodyElement>('body')

//level up after 2 succesfull word clears

// const wordsArrayLevel = [["cat", "dog", "bat", "sun", "hat", "car", "run", "fan", "map", "box"],["tree", "book", "fish", "door", "wolf", "cake", "moon", "star", "fire", "rock"],["apple", "bread", "grape", "table", "plant", "chair", "stone", "light", "river", "house"],["banana", "bridge", "garden", "planet", "orange", "stream", "rocket", "window", "silver", "forest"],["picture", "college", "cabinet", "fantasy", "journey", "mystery", "teacher", "fashion", "partner", "station"],["umbrella", "dinosaur", "laughter", "computer", "elephant", "treasure", "chocolate", "sunshine", "vacation", "building"]]



//checks if player is null
if(!player|| !block || !rock || !scoreNumb || !gameContainer || !gameStart || !gameStartBtn || !gameStartTextHighscore || !gameStartTextScore || !body || !gameTextContainer){
  throw new Error(`it didnt work`)
}

const backGroundMusic = new Audio(gameMusic)
const wordComplete = new Audio(finishedWord)
const jumpNoise = new Audio(JumpSound)
const typeNoise = new Audio(typeSound)
const losingNoise = new Audio(losingMusic)

let word: string[] = ['t','y','p','e'] //first word will alwayse be type so the user knows not to jump
let score: number = 0;
let isGameActive: boolean = false //for ending the game screen
let rockObstacle: boolean = true
let level = 0
let wordCleared = 0
let highScore = 0

const randomWordGen = (arrayOfWords:string[][]) => {
  if(level <= arrayOfWords.length){
    const currArr: string[] = arrayOfWords[level]
    const randomNumb:number =  Math.floor(Math.random() * currArr.length)
    word = currArr[randomNumb].split('')
  }
}

const handleGameLoss = (reason:string) => {
  if(isGameActive){
    console.log(isGameActive,'in true')
    isGameActive = false

    let losingText = document.querySelector<HTMLParagraphElement>('.losing-text');

    if (!losingText) {
      // If it doesn't exist create it 
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
      gameStartTextHighscore.innerText =  `New Highscore !!!`
      gameStartTextScore.innerText = `${score}`
    } else {
      gameStartTextScore.innerText = `Score: ${score}`
      gameStartTextHighscore.innerText =  `HighScore: ${highScore}`
    }

    gameContainer.style.display = 'none'
    gameStart.style.display = 'flex'
    backGroundMusic.pause(); // Stops music
    backGroundMusic.currentTime = 0; //ressets music track back to start
    losingNoise.play()
    body.style.backgroundImage = `url(${loadingBackgroundImage})`
    handleObstacleChangeToRock()
  }
}
const handleHighscore = () => {
  if(score>highScore){
    highScore = score
  }
}
const handleGameStart = () => {
    if(!isGameActive){
    console.log(isGameActive,'in false')
    isGameActive = true
    console.log('you clicked start game')
    gameContainer.style.display = 'block'
    gameStart.style.display = 'none'
    body.style.backgroundImage = `url(${inGameBackgroundImage})`
    backGroundMusic.play()
    randomWordGen(wordsArrayLevel)
  }
}

const handleLevelUp = () => {
      if(wordCleared % 2 === 0 && score !== 0){
      level ++
      }
      console.log(level,'this is the level')
      // randomWordGen(wordsArray)
}
const handleScoreUpdate = () => {
  scoreNumb.innerText = score.toString()
  // handleLevelUp()
}
//changes display to show to word obstacle
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
      // sendRockObstacle()
      }
  }

  // const sendRockObstacle = () => {
  //   if(!rock.classList.contains('obstacle')){
  //     rock.classList.add('obstacle')
  //     console.log('adding')
  //     setTimeout(() => {
  //       console.log('remoiving')
  //       rock.classList.remove('obstacle')
  //     },2000)
  //   }
  // }

const handleJump = () => {
  //this ensures you cant click jump if word obstacle is on screen
  if(rockObstacle){
    //to remove bug of spam clicking we only allow the addition of classname if the classsname dosnt already exist on the elemnt
    if(!player.classList.contains('jump')){
      //this will add the class name jump to the html elemnt with classname player
      player.classList.add('jump')
      jumpNoise.play()
      //this will remove the classname jump after 1s (which is the same time it takes to finish the animation)
      score ++
      setTimeout(() => {
        player.classList.remove('jump')
        //score only updates when this happens to ensure score dosnt update if un seccesful jump
        // hasJumped = false
        handleScoreUpdate()
      }, 1000);
    }
  }
}

const handleSpaceJump = (event: KeyboardEvent) => {
  if(rockObstacle){
    if(event.code ==='Space') {
      console.log('in handle tyuping on rock obstacle',event.code)
      event.preventDefault();
      handleJump()
    }
  }
}

let currentIndex:number = 0

const handleTyping = (event: KeyboardEvent) => {
  if(!rockObstacle) {
      const currentLetter = word[currentIndex]
    if (event.key === currentLetter){
      typeNoise.currentTime = 0;
      typeNoise.play()
      word.shift()
      block.innerText = word.join('')
      console.log(word.length)
      console.log('correct letter')
      handleScoreUpdate()
      if(word.length === 0){
        wordComplete.play()
        score++
        ++wordCleared 
        console.log(wordCleared,'<-- word cleared score')
        handleScoreUpdate()
        handleLevelUp()
        randomWordGen(wordsArrayLevel)
      }
    } else {
      console.log('incorrect letter')
      console.log(currentLetter)
      handleGameLoss('typing')
      // alert('you lost')
      handleHighscore()
      score = 0
      wordCleared = 0
      level = 0
      currentIndex = 0;
      randomWordGen(wordsArrayLevel)
      //makes next obstacle in new game back to rock
      handleObstacleChangeToRock()
      handleScoreUpdate()
    }  
  }
}
const handleClickWord = () => {
  if(!rockObstacle){
    typeNoise.currentTime = 0;
    typeNoise.play()
    word.shift()
    block.innerText = word.join('')
    handleScoreUpdate()
    if(word.length === 0){
        wordComplete.play()
        score++
        ++wordCleared 
        console.log(wordCleared,'<-- word cleared score')
        handleScoreUpdate()
        handleLevelUp()
        randomWordGen(wordsArrayLevel)
      }
  }
}

  setInterval(() => {
    const playerPositionTop = player.offsetTop as number //start at 250 jumps to 175
    const blockPositionLeft = block.offsetLeft as number  //start at 350 ends of screen at 0
    const rockPositionLeft = rock.offsetLeft as number //start at 350 ends of screen at 0
    //need to fix this for new positions
    if(playerPositionTop > 200  && (rockPositionLeft < 30 && rockPositionLeft > 10) || blockPositionLeft < 50 && blockPositionLeft > 10){
    //alert('u lose')
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
  // console.log(playerPositionTop,rockPositionLeft)
    console.log(score)
    if(score % 4 !== 0){
      // sendRockObstacle()
      handleObstacleChangeToRock()
    }
  }, 10)



//allowing user to click or use space bar making it mobile friendly
gameStartBtn.addEventListener('click',handleGameStart)
block.addEventListener('click',handleClickWord)
document.addEventListener('click', handleJump)
document.addEventListener('keydown',handleSpaceJump)
document.addEventListener('keydown',handleTyping)



//adding keyboard event to the document an not a variable as we want the keyboard events to global also changed the click to the document so that the player can click anywhere on the screen
// document.addEventListener('keydown', handleTyping)
