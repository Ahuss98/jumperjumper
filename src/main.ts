import './styles/styles.scss'
//grabs the html element with a classname of player
const player = document.querySelector<HTMLDivElement>('.player')
const block = document.querySelector<HTMLDivElement>('.block')
const rock = document.querySelector<HTMLImageElement>('.block--img')
const scoreNumb = document.querySelector<HTMLParagraphElement>('.score--number')


const wordsArray = ['hello','hi','good','type','extra']

//checks if player is null
if(!player|| !block || !rock || !scoreNumb){
  throw new Error('it didnt work')
}

const randomWordGen = (arrayOfWords:string[]) => {
  const randomNumb:number =  Math.floor(Math.random() * arrayOfWords.length)
  word = arrayOfWords[randomNumb].split('')
}

let word: string[] = ['e','a','t']
let score: number = 0;
let isGameActive: boolean = true //for ending the game 
let rockObstacle: boolean = true

const handleScoreUpdate = () => {
  scoreNumb.innerText = score.toString()
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
      }
  }

const handleJump = () => {
  //this ensures you cant click jump if word obstacle is on screen
  if(rockObstacle){
    //to remove bug of spam clicking we only allow the addition of classname if the classsname dosnt already exist on the elemnt
    if(!player.classList.contains('jump')){
      //this will add the class name jump to the html elemnt with classname player
      player.classList.add('jump')
      //this will remove the classname jump after 1s (which is the same time it takes to finish the animation)
      setTimeout(() => {
        player.classList.remove('jump')
        score ++
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
      word.shift()
      block.innerText = word.join('')
      console.log(word.length)
      console.log('correct letter')
      handleScoreUpdate()
      if(word.length === 0){
        score++
        handleScoreUpdate()
        randomWordGen(wordsArray)
      }
    } else {
      console.log('incorrect letter')
      alert('you lost')
      score = 0
      currentIndex = 0;
      handleScoreUpdate()
    }  
  }
}

  setInterval(() => {
    const playerPositionTop = player.offsetTop as number //start at 250 jumps to 175
    const blockPositionLeft = block.offsetLeft as number  //start at 350 ends of screen at 0
    const rockPositionLeft = rock.offsetLeft as number //start at 350 ends of screen at 0
    //need to fix this for new positions
    if(playerPositionTop > 200  && (rockPositionLeft < 30 && rockPositionLeft > 10) || blockPositionLeft < 50 && blockPositionLeft > 10){
    alert('u lose')
    score = 0
  }
  // console.log(playerPositionTop,rockPositionLeft)
    console.log(score)
    if(score % 4 !== 0){
      handleObstacleChangeToRock()
    }
    if(score !== 0 && score % 4 === 0){
      handleObstacleChangeToWord()
    }
      // console.log(rockPositionLeft)
  }, 10)



//allowing user to click or use space bar making it mobile friendly
document.addEventListener('click', handleJump)
document.addEventListener('keydown',handleSpaceJump)

document.addEventListener('keydown',handleTyping)



//adding keyboard event to the document an not a variable as we want the keyboard events to global
// document.addEventListener('keydown', handleTyping)