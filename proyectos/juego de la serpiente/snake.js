const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;  // Tamaño de cada cuadro
let score = 0;   // Inicializamos el marcador de puntos

let snake = [
    {x: 9 * box, y: 10 * box},
    {x: 8 * box, y: 10 * box},
    {x: 7 * box, y: 10 * box}
];

let direction = "RIGHT";

// Posición inicial de la comida
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// Dibujar la comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Dibujar la serpiente
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

// Función principal del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida y serpiente
    drawFood();
    drawSnake();

    // Mover la serpiente
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Comprobar si la serpiente ha comido la comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').innerText = "Puntos: " + score;  // Actualizamos el marcador
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();  // Si no ha comido, quitamos el último segmento
    }

    let newHead = {x: snakeX, y: snakeY};

    // Comprobar si la serpiente choca con el borde o consigo misma
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);  // Detener el juego si hay colisión
        alert("¡Has perdido! Puntuación: " + score);
        return;
    }

    snake.unshift(newHead);
}

// Función para comprobar colisiones con el cuerpo
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Captura las teclas para cambiar la dirección
document.addEventListener("keydown", (event) => {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
});

// Comenzar el juego
let game;
document.getElementById("startButton").addEventListener("click", () => {
    game = setInterval(gameLoop, 100);
});

// Reiniciar el juego
document.getElementById("resetButton").addEventListener("click", () => {
    location.reload();
});
