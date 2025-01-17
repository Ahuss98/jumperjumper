# 🥋 jumperjumper 
welcome to my first **typescript** game project jumperjumper where i will be combining my skills to create a vissually apealing and reactive game with **typescript** and **SASS** utilizing the **DOM**.


## Project Breakdown

## 🔄 Game loop 

- game starts
- block approaches player model
- player has to input jump
- either clears the block successfully/ fails and game ends( or lose life)
    - Extra functionality:
        - every 3 successful jumps the block turns into a word
        - the user must type this word to clear the jump
            - this word can increase in length to increase difficulty/timer is imposed
---
### 🎨 HTML/SASS 
html elements:
- [] one **div** for player model
- [] one **div** for block model

css styling:
- [] the player **div** must have a **keyframe** animation on the left side of the screen that jumps 50px of the ground
- [] the block **div** must have a **keyframe** animation that moves from the right hand side of the screen to the left hand side and to repeat infinitely
---
### 🧑‍🎨 Further design 

- [] a jumper of 50px x 50px for player
- [] a rock for the block 50px x 50px
- [] animation for jumper to jump 51px off the ground
- [] background is of a blue sky and sun in the top right corner
- [] some clouds that move to give the imitation that the player is moving across the screen
---
### 👨‍💻 Typescript logic 

- [] event handler/listener to trigger player animation to jump on command
- [] event listener to detect weather block and player have collided
    - [] extra functionality:
        - [] event handler for when 3 successful jumps have been inputted to send word block
        - [] event listener to detect if word being typed matches block word
        - [] handler to let player model jump over word block and reset game loop