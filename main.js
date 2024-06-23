import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball()

const paddlePushoff = 40
const paddleWidth = 20

const leftPaddle = new Paddle(paddleWidth)
leftPaddle.setAxis(paddlePushoff)
const rightPaddle = new Paddle(paddleWidth)
rightPaddle.setAxis(window.innerWidth - paddlePushoff)

document.addEventListener("pointermove", (e) => {
    rightPaddle.setY(e.clientY)
})

var inPlay = true
ball.velocity = 3
ball.direction = (7 * Math.PI) / 4
const rightPlane = window.innerWidth - (paddlePushoff + (paddleWidth / 2))
const leftPlane = paddlePushoff + (paddleWidth / 2)
while(inPlay) {
    let candidateX = ball.posX + (Math.cos(ball.direction) * ball.velocity)
    let candidateY = ball.posY - (Math.sin(ball.direction) * ball.velocity)
    if (ball.posY + ball.radius > window.innerHeight) {
        candidateY = window.innerHeight - ball.radius
        ball.direction = -ball.direction
    } else if (ball.posY - ball.radius < 0) {
        candidateY = ball.radius
        ball.direction = -ball.direction
    }
    if (candidateX + ball.radius >= rightPlane && ball.posX + ball.radius < rightPlane && rightPaddle.checkY(ball.posY)) {
        ball.direction = Math.PI - ball.direction
    } else if (candidateX - ball.radius <= leftPlane && ball.posX - ball.radius > leftPlane && leftPaddle.checkY(ball.posY)) {
        ball.direction = Math.PI - ball.direction
    }
    ball.setPos(candidateX, candidateY)
    leftPaddle.setY(candidateY)
    await new Promise(f => setTimeout(f, 5))
}