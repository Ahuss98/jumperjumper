import './styles/styles.scss'
import { backGroundMusic,wordComplete,jumpNoise,typeNoise,losingNoise } from './audio' //these are the audio files I used 
import { wordsArrayLevel } from './data' //an array with arrays with words of certain lengths
import inGameBackgroundImage from '../public/media/modified_underground_space_with_gap.png'
import repeatingBackground from '../public/media/Screenshot 2025-01-18 at 17.11.23.png'
import loadingBackgroundImage from '../public/media/sky.webp'

//grabs the html elements
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


//checks if the element returns null and throws a error to the terminal
if(!player|| !block || !rock || !scoreNumb || !gameContainer || !menu || !menuBtn || !menuTextHighscore || !menuTextScore || !body || !gameTextContainer){
  throw new Error(`it didnt work`)
}

//these are all the global variables i useed for the project for control flow all set to default values for inital game functionality
let word: string[] = ['t','y','p','e'] //first word will alwayse be type so the user knows not to jump
let score: number = 0;
let isGameActive: boolean = false //for ending the game screen
let rockObstacle: boolean = true  //for checking state of obstacle
let wordCleared:number = 0 //checks how many words completed 
let level:number = 0  //updates dending on conditions and is used to change word length difficulty selectd from array
let highScore:number = 0 //displays users highest score achieved


//selects an array from my data.ts depending on level and selects a random word from said array and then reassigns the word variable
const randomWordGen = (arrayOfWords:string[][]) => {
  if(level <= arrayOfWords.length){
    const currArr: string[] = arrayOfWords[level]
    const randomNumb:number =  Math.floor(Math.random() * currArr.length)
    word = currArr[randomNumb].split('')
  }
}

//this uses control flow and the an argument passed to the function to display different messeges on how the user lost
const handleGameLoss = (reason:string) => {
  //ensures game is active before displaying message to avoid errors
  if(isGameActive){
    //sets the game state to false for next part of control flow and to avoid erros when playiong game
    isGameActive = false
    //pulls lsing text if already exists
    let losingText = document.querySelector<HTMLParagraphElement>('.losing-text');
    //check if value of losing text is null to avoid recreate element multiple times
    if (!losingText) {
      // If it doesn't exist create it 
      losingText = document.createElement('p');
      losingText.classList.add('losing-text');
      gameTextContainer.appendChild(losingText);
    }
    //control flow for reason of loss
    if(reason === 'collision'){
      losingText.innerText = 'you missed timed your jump'
    }
    if(reason === 'typing'){
      losingText.innerText = 'you typed the wrong letter'
    }
    //displays highscore if a new highscore is reached
    if( score >= highScore){
      menuTextHighscore.innerText =  `New Highscore !!!`
      menuTextScore.innerText = `${score}`
    } else {
      menuTextScore.innerText = `Score: ${score}`
      menuTextHighscore.innerText =  `HighScore: ${highScore}`
    }
    //hides main game container and displays container for the menu
    gameContainer.style.display = 'none'
    menu.style.display = 'flex'
    backGroundMusic.pause(); // Stops music
    backGroundMusic.currentTime = 0; //ressets music track back to start
    losingNoise.play() // plays music from the start
    body.style.backgroundImage = `url(${loadingBackgroundImage})` //changes background image
    body.style.backgroundRepeat = 'repeat' 
    handleObstacleChangeToRock()  //changes obstacle back to rock for next game
  }
}
//checks wheather game is inactive first then displays the the game container and hides the menu
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

//upadtes the highscore
const handleHighscore = () => {
  if(score>highScore){
    highScore = score
  }
}


//updates the level
const handleLevelUp = () => {
      if(wordCleared % 2 === 0 && score !== 0){
      level ++
      }
}

//updates the score on screen
const handleScoreUpdate = () => {
  scoreNumb.innerText = score.toString()
}
//changes display to show to word obstacle and only triggering is rockObstacle falg is true
const handleObstacleChangeToWord = () => {
  if(rockObstacle){
    block.innerText = word.join('')
    block.classList.add('slow-obstacle')
    rock.classList.remove('obstacle')
    rock.style.display = 'none'
    block.style.display = 'block'
    rockObstacle = false
  }}
//changes display to show to word rock and only triggering is rockObstacle falg is false
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
        handleScoreUpdate()
      }, 1000);
    }
  }
}
//if the user wants to jump with the space key it will check for the input and then invoke the handleJump
const handleSpaceJump = (event: KeyboardEvent) => {
  if(rockObstacle){
    if(event.code ==='Space') {
      //disables the default scroll function of the space key
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
      //logic for retriggering word on every click
      typeNoise.currentTime = 0;
      typeNoise.play()
      //removes the first letter when triggered
      word.shift()
      //updates the visual word to reflect the word to type
      block.innerText = word.join('')
      handleScoreUpdate()
      if(word.length === 0){
        //logic for comppleted word and creates a new word to be displayed next time this function is invoked
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
      //resets all global variables back to default values for new game
      score = 0
      wordCleared = 0
      level = 0
      currentIndex = 0;
      randomWordGen(wordsArrayLevel) // generates a new word and assigns it because level is now 0
      //makes next obstacle in new game back to rock
      handleObstacleChangeToRock()
      handleScoreUpdate()
    }  
  }
}

//similar logic to handletyping but for clicking the word
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

  //this is my hit detection logic which uses setInterval and does checks every set time interval which i can change
  setInterval(() => {
    //these are variables to collect the data of the current positions of the interactive pieces the users interacts with
    const playerPositionTop = player.offsetTop as number //start at 250 jumps to 175
    const blockPositionLeft = block.offsetLeft as number  //start at 350 ends of screen at 0
    const rockPositionLeft = rock.offsetLeft as number //start at 350 ends of screen at 0
    //logic to check weather the positions of the the pieces have collided by checking certain positions are true then a collision has happened
    if(playerPositionTop > 200  && (rockPositionLeft < 30 && rockPositionLeft > 10) || blockPositionLeft < 50 && blockPositionLeft > 10){
    //produce a loss if it meets this criteria
    handleHighscore()
    handleGameLoss('collision')
    score = 0
    wordCleared = 0
    level = 0
    }
    //ensures the word only apears when the rock is off or aat the end of the screen
    if(rockPositionLeft < -40){
      //logic to change to word which has logic inside to enure to only happens when it a rock first
      if(score !== 0 && score % 4 === 0){
        handleObstacleChangeToWord()
      }
    }
    if(score % 4 !== 0){
      //logic to change to rock which has logic inside to enure to only happens when it a word first
      handleObstacleChangeToRock()
    }
  }, 10)



//allowing user to click or use space bar making it mobile friendly
//event listener to allow user to start game and restart game
menuBtn.addEventListener('click',handlemenu)
//this allow users to click on word instead of typing
block.addEventListener('click',handleClickWord)

//event listeners applied to the dom to allow user to type or click anywhere on screen to trigger events
document.addEventListener('click', handleJump)
document.addEventListener('keydown',handleSpaceJump)
document.addEventListener('keydown',handleTyping)

