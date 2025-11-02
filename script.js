const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const energy = document.getElementById('energy');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const howToPlay = document.getElementById('howToPlay');
const closePopup = document.getElementById('closePopup');

let playerX = 285;
let playerY = 360;
let energyLevel = 100;
let ghosts = [];
let gameOver = false;

// Movement
document.addEventListener('keydown', (e) => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft' && playerX > 0) playerX -= 20;
  if (e.key === 'ArrowRight' && playerX < 570) playerX += 20;
  if (e.key === 'ArrowUp' && playerY > 0) playerY -= 20;
  if (e.key === 'ArrowDown' && playerY < 370) playerY += 20;
  player.style.left = playerX + 'px';
  player.style.top = playerY + 'px';
});

// Ghost Spawning
function spawnGhost() {
  const ghost = document.createElement('div');
  ghost.classList.add('ghost');
  ghost.style.left = Math.random() * 570 + 'px';
  ghost.style.top = '-40px';
  gameArea.appendChild(ghost);
  ghosts.push(ghost);
  moveGhost(ghost);
}

// Ghost Movement
function moveGhost(ghost) {
  let top = -40;
  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      ghost.remove();
      return;
    }

    top += 3;
    ghost.style.top = top + 'px';

    if (top > 400) {
      ghost.remove();
      ghosts = ghosts.filter(g => g !== ghost);
      clearInterval(interval);
    }

    // Collision detection
    const ghostRect = ghost.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    if (
      ghostRect.x < playerRect.x + playerRect.width &&
      ghostRect.x + ghostRect.width > playerRect.x &&
      ghostRect.y < playerRect.y + playerRect.height &&
      ghostRect.y + ghostRect.height > playerRect.y
    ) {
      energyLevel -= 10;
      energy.style.width = energyLevel + '%';
      ghost.remove();
      clearInterval(interval);
      if (energyLevel <= 0) endGame();
    }
  }, 30);
}

// Energy Regeneration
setInterval(() => {
  if (!gameOver && energyLevel < 100) {
    energyLevel += 2;
    if (energyLevel > 100) energyLevel = 100;
    energy.style.width = energyLevel + '%';
  }
}, 1000);

// Game Loop
setInterval(() => {
  if (!gameOver) spawnGhost();
}, 1000);

// Game Over
function endGame() {
  gameOver = true;
  alert('Game Over! You survived the Y2K ghosts 🕹️');
  location.reload();
}

// Popup Control
howToPlayBtn.addEventListener('click', () => {
  howToPlay.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  howToPlay.style.display = 'none';
});
