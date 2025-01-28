import gameMusic from '../public/sound/cottagecore-17463.mp3'
import finishedWord from '../public/sound/achievement-video-game-type-1-230515.mp3'
import JumpSound from '../public/sound/retro-jump-3-236683.mp3'
import typeSound from '../public/sound/retro-coin-1-236677.mp3'
import losingMusic from '../public/sound/failure-1-89170.mp3'

export const backGroundMusic = new Audio(gameMusic)
export const wordComplete = new Audio(finishedWord)
export const jumpNoise = new Audio(JumpSound)
export const typeNoise = new Audio(typeSound)
export const losingNoise = new Audio(losingMusic)

