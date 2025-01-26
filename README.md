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
- [] add replay
- [x] add score tracking

css styling:
- [x] the player **div** must have a **keyframe** animation on the left side of the screen that jumps 100px of the ground
- [x] the block **div** must have a **keyframe** animation that moves from the right hand side of the screen to the left hand side and to repeat infinitely
- [] an animation keyframe for moving background objects such as the cactus and moon/sun
- [] add moon which can switch to the sunand make the screen day time and change to sun
---
### 🧑‍🎨 Further design 

- [x] a jumper of 50px x 50px for player
- [x] a rock for the block 50px x 50px
- [x] animation for jumper to jump 51px off the ground
- [x] background is of a blue sky and sun in the top right corner/balck sky and moon
- [x] cactus that move to give the imitation that the player is moving across the 
    screen
- [x] create and design an end screen
- [x] create a new background image on start screen and playijng screen
- [x] design a font for information when on start or losing
- [x] display curretn score on losing menu
- [x] display highscore on losing menu
- [x] display when a new highscore has been achieved on losing menu
---
### 👨‍💻 Typescript logic 

- [x] event handler/listener to trigger player animation to jump on command
- [x] event handler and global listenre to allow key presses (space bar) to jump
- [x] event listener to detect weather block and player have collided
    - [] extra functionality:
        - [x] event handler for when 3 successful jumps have been inputted to send word block
        - [x] event listener to detect if word being typed matches block word
        - [x] when failed a jump show end screen
        - [x] when type wrong letter in word display end screen
        - [x] create functionality for end screen to allow player to restart game
- [x] allow users to click instead of type to make more mobile friendly and more accessable
- [] display a keyboard when on mobile to allow users to type on the keyboard

### 🎶 Music Logic

- [x] add sound for jumo animation
- [x] add sound for typing word logic
    - that resets when a new latter is typed to give satisfying noise effect
- [x] add background music
- [x] add finishing a word sound
- [x] add losing screen sound
