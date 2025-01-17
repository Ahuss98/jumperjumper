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
    if(playerPositionTop > 98 && (rockPositionLeft < 50 && rockPositionLeft > 10)){
    // if(playerPositionTop > 98 && (rockPositionLeft < -300 && rockPositionLeft > -340)){
      alert('u lose')
      counter = 0
    }
    // console.log(counter)
      console.log(rockPositionLeft)
  }, 10)


player.addEventListener('click', handleJump)

