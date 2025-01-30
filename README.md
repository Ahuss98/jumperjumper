# 🥋 JumperJumper 
Welcome to my first **TypeScript** game project, **JumperJumper**, where I combine my skills to create a visually appealing and reactive game using **TypeScript**, **SASS**, and the **DOM**.

---

## 🕹️ About the Game

**JumperJumper** is a dynamic and interactive game where players control a character to jump over obstacles and occasionally type words to clear challenges. The game incorporates animation, interactivity, and responsive design to deliver an enjoyable experience. 

### Key Features:
- **Jump and Type Gameplay**: Avoid obstacles by jumping and type words accurately for advanced challenges.
- **Dynamic Difficulty**: The game becomes more challenging as you progress.
- **Sleek Design**: A visually appealing environment with changing backgrounds, animated elements, and smooth transitions.
- **Audio Integration**: Background music and sound effects enhance the gameplay experience.

This project represents a significant milestone in my development journey, combining creativity and technical skills to produce a fun and functional application.

### 🌐 [Play the Game Here!](https://ahuss98.github.io/jumperjumper/)

---

## Project Breakdown
<details>
  <summary>Click to Expand</summary>

### 🔄 Game Loop
- The game starts.
- A block approaches the player model.
- The player inputs a jump.
- The result is either:
  - The block is cleared successfully, or
  - The player fails, and the game ends (or the player loses a life).

**Extra functionality:**
- Every 3 successful jumps, the block turns into a word.
- The user must type this word to clear the jump.
  - The word can increase in length to raise difficulty.

---

### 🎨 HTML/SASS

#### HTML Elements:
- [x] One **div** for the player model.
- [x] One **div** for the block model.
- [x] Add a "click to start" menu.
- [x] Add a losing menu.
- [x] Add a replay button.
- [x] Add score tracking.

#### CSS Styling:
- [x] The player **div** must have a **keyframe** animation on the left side of the screen that jumps 100px off the ground.
- [x] The block **div** must have a **keyframe** animation that moves from the right-hand side of the screen to the left-hand side and repeats infinitely.
- [x] An animation keyframe for moving background objects, such as the cactus and moon/sun.

---

### 🧑‍🎨 Further Design
- [x] A jumper of 50px x 50px for the player.
- [x] A rock for the block (50px x 50px).
- [x] An animation for the jumper to jump 51px off the ground.
- [x] Background of a blue sky with a sun in the top-right corner (or a black sky with a moon).
- [x] Cacti that move to give the illusion that the player is moving across the screen.
- [x] Create and design an end screen.
- [x] Create a new background image for the start screen and playing screen.
- [x] Design a font for displaying information on the start or losing screen.
- [x] Display the current score on the losing menu.
- [x] Display the high score on the losing menu.
- [x] Display when a new high score has been achieved on the losing menu.

---

### 👨‍💻 TypeScript Logic

- [x] Event handler/listener to trigger player animation to jump on command.
- [x] Global event listener to allow key presses (spacebar) to trigger jumps.
- [x] Event listener to detect whether the block and player have collided.
  - **Extra functionality:**
    - [x] Event handler for when 3 successful jumps are inputted to send a word block.
    - [x] Event listener to detect if the word being typed matches the block word.
    - [x] Show end screen when a jump is failed.
    - [x] Show end screen when the player types the wrong letter in a word.
    - [x] Create functionality for the end screen to allow the player to restart the game.
    - [x] Allow users to click instead of type to make the game more mobile-friendly and accessible.

---

### 🎶 Music Logic

- [x] Add sound for the jump animation.
- [x] Add sound for typing word logic (that resets when a new letter is typed to give a satisfying noise effect).
- [x] Add background music.
- [x] Add a finishing word sound.
- [x] Add losing screen sound.
</details>

---

## 🌟 Lessons Learned

### 🎯 Key Takeaways:

- **TypeScript Mastery**:
  Writing reusable, type-safe code with strict typing was pivotal in building robust game logic. I learned how to utilize generics, interfaces, and modular programming to create maintainable and scalable code.

- **DOM Manipulation**:
  By leveraging event listeners and handlers, I mastered interactive functionality like animations, collision detection, and real-time feedback.

- **CSS Animations & SASS**:
  Designing visually appealing elements and dynamic animations with SASS taught me how to structure styles efficiently and maintain code cleanliness.

- **Audio Integration**:
  Adding sound effects and background music allowed me to learn how to manage media assets effectively and enhance player immersion.

- **Game Design**:
  Balancing difficulty, responsiveness, and player feedback helped me understand the principles of creating an engaging and challenging game loop.

---

### 🛠️ New Skills Developed:

1. **Debugging Complex Logic**:
   I tackled challenges like precise collision detection and managing multiple states in real time.

2. **Mobile-Friendly Design**:
   I ensured accessibility for mobile players by incorporating touch input and responsive layouts.

3. **Project Management**:
   Organizing a project from scratch and breaking it into achievable tasks taught me how to stay efficient and focus on deliverables.

4. **Iterative Development**:
   I continuously improved the game by implementing new features, fixing bugs, and refining mechanics based on feedback.

---

### 🐛 Bugs
- [ ] sometimes on first ever load of wepage keyframes dont work
- [ ] when spam clicking the text while on mobile the satisfying ding noise dosnt reset straight after every press

### 🚀 Future Goals:

- Expand the game with more levels and dynamic environments.
- Incorporate multiplayer functionality to make the game more engaging.
- Continue honing my TypeScript and game design skills to take on bigger projects.
- Fix/Solve all bugs and find future bugs.

---

This project has been a rewarding journey, blending creativity and technical knowledge. I’m excited to apply these lessons in the future!

## 🤝 Contribution & Feedback

Feel free to explore the project and provide feedback!

---

Thank you for visiting! 😊 
