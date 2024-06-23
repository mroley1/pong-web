import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball()

const paddlePushoff = 40
const paddleWidth = 20

const leftPaddle = new Paddle(paddleWidth)
leftPaddle.setAxis(paddlePushoff)
const rightPaddle = new Paddle(paddleWidth)
rightPaddle.setAxis(window.innerWidth - paddlePushoff)


function calcActiveOffset() {
    activeOffsetX = Math.cos(ball.direction) * ball.velocity
    activeOffsetY = Math.sin(ball.direction) * ball.velocity
}

var inPlay = true
ball.velocity = 14
ball.direction = (7 * Math.PI) / 4
const rightPlane = window.innerWidth - (paddlePushoff + (paddleWidth / 2))
const leftPlane = paddlePushoff + (paddleWidth / 2)
document.addEventListener("keydown", (e) => {
    const paddleVelocity = 20
    switch (e.key) {
        case "w": leftPaddle.velocity = paddleVelocity; break;
        case "s": leftPaddle.velocity = -paddleVelocity; break;
        case "ArrowUp": rightPaddle.velocity = paddleVelocity; break;
        case "ArrowDown": rightPaddle.velocity = -paddleVelocity; break;
    }
})
document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w": leftPaddle.velocity = 0; break;
        case "s": leftPaddle.velocity = 0; break;
        case "ArrowUp": rightPaddle.velocity = 0; break;
        case "ArrowDown": rightPaddle.velocity = 0; break;
    }
})
var activeOffsetX
var activeOffsetY
calcActiveOffset()
while(inPlay) {
    let candidateX = ball.posX + activeOffsetX
    let candidateY = ball.posY - activeOffsetY
    if (ball.posY + ball.radius > window.innerHeight) {
        candidateY = window.innerHeight - ball.radius
        ball.direction = - ball.direction
        calcActiveOffset()
    } else if (ball.posY - ball.radius < 0) {
        candidateY = ball.radius
        ball.direction = - ball.direction
        calcActiveOffset()
    }
    if (candidateX + ball.radius >= rightPlane && ball.posX + ball.radius < rightPlane) {
        let paddleCheck = rightPaddle.checkY(ball.posY)
        if (paddleCheck != null) {
            ball.direction = Math.PI + paddleCheck
        }
        ball.velocity = ball.velocity + 1
        calcActiveOffset()
    } else if (candidateX - ball.radius <= leftPlane && ball.posX - ball.radius > leftPlane) {
        let paddleCheck = leftPaddle.checkY(ball.posY)
        if (paddleCheck != null) {
            ball.direction = - paddleCheck
        }
        ball.velocity = ball.velocity + 1
        calcActiveOffset()
    }
    ball.setPos(candidateX, candidateY)
    leftPaddle.setY(leftPaddle.posY - leftPaddle.velocity)
    rightPaddle.setY(rightPaddle.posY - rightPaddle.velocity)
    await new Promise(f => setTimeout(f, 16))
}