const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const c = context;

canvas.width = 1024;
canvas.height = 576;

const color = {
  ally: "red",
  enemy: "blue",
};

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  constructor({ position, color, velocity }) {
    this.position = position;
    this.color = color;
    this.velocity = velocity;
    this.height = 150;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  position: {
    x: 10,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: color.ally,
});

const enemy = new Sprite({
  position: {
    x: 870,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: color.enemy,
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },

};
let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -3;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 3;
  }
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "w":
      player.velocity.y = -10
      break;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        player.velocity.y = -10
        break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
  }
});
