import './styles/styles.scss'
//grabs the html element with a classname of player
const player = document.querySelector<HTMLDivElement>('.player')
const block = document.querySelector<HTMLDivElement>('.block')
const rock = document.querySelector<HTMLImageElement>('.block--img')


//checks if player is null
if(!player|| !block || !rock){
  throw new Error('it didnt work')
}

let counter: number = 0;
let isGameActive: boolean = true
let rockObstacle: boolean = true

const handleObstacleChange = () => {
  if(rockObstacle){
    block.innerText = 'WAY'
    block.classList.add('slow-obstacle')
    rock.classList.remove('obstacle')
    block.style.animation = 'animation: 8s'
    rock.style.display = 'none'
    rockObstacle = false
  }
  // if(!rockObstacle){
  //   rock.classList.add('obstacle')
  //   block.classList.remove('obstacle')
  //   block.style.display = 'none'
  //   rockObstacle = true
  // }
}

const handleJump = () => {
  //to remove bug of spam clicking we only allow the addition of classname if the classsname dosnt already exist on the elemnt
  if(!player.classList.contains('jump')){
    //this will add the class name jump to the html elemnt with classname player
    player.classList.add('jump')
    //this will remove the classname jump after 1s (which is the same time it takes to finish the animation)
    setTimeout(() => {
      player.classList.remove('jump')
    }, 1000);
    counter ++
  }
}
//if player top position is between 152 and height of block and
// if block left position is between 0 and width of block

  setInterval(() => {
    const playerPositionTop = player.offsetTop as number
    const blockPositionLeft = block.offsetLeft as number
    const rockPositionLeft = rock.offsetLeft as number
    //need to fix this for new positions
    // if(playerPositionTop > 98 && (rockPositionLeft < 45 && rockPositionLeft > 5)){
    //  // alert('u lose')
    //   counter = 0
    // }
    console.log(counter)
    if(counter >= 3){
      handleObstacleChange()
    }
      // console.log(rockPositionLeft)
  }, 10)

//allowing user to click or use space bar making it mobile friendly
player.addEventListener('click', handleJump)

//adding keyboard event to the document an not a variable as we want the keyboard events to global
document.addEventListener('keydown', (event: KeyboardEvent) => {
  if(event.code ==='Space') {
    event.preventDefault();
    handleJump()
  }
})

if(!rockObstacle){
  document.addEventListener('keydown',(event: KeyboardEvent) => {
    //elevate on first letter and land back down on last letter
    //after last correct charechter word animations speed off screen then i land
    

  })
}