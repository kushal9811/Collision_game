let paintbox = document.getElementById('paintbox')
let context = paintbox.getContext('2d')

let gameOn = true

let playerSpeed = 5

let playerWon = false;

class Box {
  constructor(size, color) {
    this.size = size
    this.color = color
    this.x = 0
    this.y = 0
  }
}

class Player extends Box {
    constructor() {
      super(50, 'blue')
      this.x = 0
      this.y = 225 // Set the vertical position to a fixed value
      this.speed = 0
    }
    move() {
      this.x += this.speed
      // Ensure the y position doesn't change
      this.y = 225
    }
}
  

class Enemy extends Box {
  constructor(speed) {
    super(50, 'red')
    this.speed = speed
  }

  move() {
    this.y += this.speed
    if (this.y + this.size > 500) {
      this.speed = -Math.abs(this.speed)
    }
    if (this.y < 0) {
      this.speed = Math.abs(this.speed)
    }
  }
}

let player = new Player()
let e1 = new Enemy(4)
let e2 = new Enemy(6)
let e3 = new Enemy(8)
e1.x = 100
e2.x = 233
e3.x = 366

function isCollided(box1, box2) {
    // Calculate the center coordinates of both boxes
    const box1X = box1.x + box1.size / 2;
    const box1Y = box1.y + box1.size / 2;
    const box2X = box2.x + box2.size / 2;
    const box2Y = box2.y + box2.size / 2;
  
    // Calculate the distance between the centers of the two boxes
    const deltaX = Math.abs(box1X - box2X);
    const deltaY = Math.abs(box1Y - box2Y);
  
    // Check if the distance is less than half the sum of their sizes
    if (deltaX < (box1.size + box2.size) / 2 && deltaY < (box1.size + box2.size) / 2) {
      return true; // Collision detected
    }
  
    return false; // No collision
  }
  

function drawBox(box) {
  context.fillStyle = box.color
  //fillReact(top,left,height,width)
  context.fillRect(box.x, box.y, box.size, box.size)
}

paintbox.addEventListener('mousedown', () => {
  player.speed = playerSpeed
})

paintbox.addEventListener('mouseup', () => {
  player.speed = 0
})

setInterval(() => {
    playerSpeed =  5 + parseInt(Math.random() * 10)
    player.y = 100 + (Math.random() * 300)
}, 2000)

function resetGame() {
    player.x = 0;
    player.speed = 0;
    playerWon = false;
    gameOn = true;
  }


function gameLoop() {
  if (!gameOn) return  
  console.log('frame update')
  context.clearRect(0, 0, 500, 500)
  e1.move()
  e2.move()
  e3.move()
  player.move()

  if (isCollided(e1, player) || isCollided(e2, player) || isCollided(e3, player)) {
    gameOn = false  
    window.alert('Game Over')
    resetGame()
  }
  // Check for a win condition
  if (player.x > 450 && !playerWon) {
    playerWon = true;
    window.alert('You Win!')
    resetGame() // Call a function to reset the game
  }


  drawBox(player)
  drawBox(e1)
  drawBox(e2)
  drawBox(e3)


  window.requestAnimationFrame(gameLoop)
}

gameLoop()