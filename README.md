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
- [x] one **div** for player model
- [x] one **div** for block model
- [] add click to start menu
- [] add losing menu
- [] add pause menu
- [x] add score tracking

css styling:
- [x] the player **div** must have a **keyframe** animation on the left side of the screen that jumps 100px of the ground
- [x] the block **div** must have a **keyframe** animation that moves from the right hand side of the screen to the left hand side and to repeat infinitely
- [] add moon which can switch to the sunand make the screen day time and change to sun
---
### 🧑‍🎨 Further design 

- [x] a jumper of 50px x 50px for player
- [x] a rock for the block 50px x 50px
- [x] animation for jumper to jump 51px off the ground
- [] background is of a blue sky and sun in the top right corner
- [] some clouds that move to give the imitation that the player is moving across the 
    screen
- [] create and design an end screen
---
### 👨‍💻 Typescript logic 

- [x] event handler/listener to trigger player animation to jump on command
- [x] event handler and global listenre to allow key presses (space bar) to jump
- [x] event listener to detect weather block and player have collided
    - [] extra functionality:
        - [x] event handler for when 3 successful jumps have been inputted to send word block
        - [] event listener to detect if word being typed matches block word
        - [] handler to let player model jump over word block and reset game loop
        - [] when failed a jump show end screen
        - [] create functionality for end screen to allow player to restart game