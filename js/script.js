const canvas = document.getElementById('game')

//Двумерная змейка
const context = canvas.getContext('2d')

//Размер одной клетки на поле - 16px
let grid = 16
//Скорость змейки
let count = 0

let ochko = document.getElementById('ochko')
let audio = document.getElementById('audio')
let auduo1 = new Audio('./preview23.mp3')

//ЗМЕЙКА 
let snake = {
    // Начальные координаты
    x: 160, y: 160,
    //Скорости змейки - в каждом кадре змейка смещается по оси X или Y
    //На старте будет двигаться горизонтально, поэтому скрость по Y равна 0
    dx: grid, dy: 0,
    //Стартовая длина змейки - 4 клетки
    maxCells: 4,
    cells: []
}

//Яблоко 
let apple = {
    x: 320, y: 320
}

//Генератор рандомных чисел в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

//Игровой цикл 

function loop() {
    requestAnimationFrame(loop)

    if (++count < 6) { return; }
    //Обнуляем переменную скорости
    count = 0

    //Очищаем игровое поле
    context.clearRect(0, 0, canvas.width, canvas.height)

    //Движение змейки
    snake.x += snake.dx
    snake.y += snake.dy

    //Если змейка достигла края поля по X - продолжаем её движение с противоположной стороны
    if (snake.x < 0) {
        snake.x = canvas.width - grid
    } else if (snake.x >= canvas.width) {
        snake.x = 0
    }

    //Если змейка достигла края поля по Y - продолжаем её движение с противоположной стороны
    if (snake.y < 0) {
        snake.y = canvas.height - grid
    } else if (snake.y >= canvas.height) {
        snake.y = 0
    }

    //Продолжаем двигаться в выбранном направлении. Голова всегда впереди,
    //поэтому добавляем ее координаты в начало массива, который отвечает за всю змейку
    snake.cells.unshift({ x: snake.x, y: snake.y })

    //Очищаем клетку в конце при движении
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
    }

    //Apple
    context.fillStyle = 'red'
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1)

    //Snake
    context.fillStyle = 'green'

    snake.cells.forEach((cell, index) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1)

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++
            ochko.innerHTML = snake.maxCells - 4

            let audio = new Audio('./preview.mp3')
            audio.play()

            console.log(snake.maxCells)
        
            apple.x = getRandomInt(0, 25) * grid
            apple.y = getRandomInt(0, 25) * grid

        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160
                snake.y = 160
                snake.cells = []
                snake.maxCells = 4
                snake.dx = grid
                snake.dy = 0

                apple.x = getRandomInt(0, 25) * grid
                apple.y = getRandomInt(0, 25) * grid

                ochko.innerHTML = snake.maxCells - 4
                auduo1.play()
            
            }
        }
    
    })

}

window.addEventListener('keydown', (event) => {
    //left
    if (event.which === 37 && snake.dx === 0) {
        snake.dx = -grid
        snake.dy = 0
    }
    //up
    else if (event.which === 38 && snake.dy === 0) {
        snake.dy = -grid
        snake.dx = 0
    }
    //right
    else if (event.which === 39 && snake.dx === 0) {
        snake.dx = grid
        snake.dy = 0
    }
    //down
    else if (event.which === 40 && snake.dy === 0) {
        snake.dy = grid
        snake.dx = 0
    }
})

requestAnimationFrame(loop)
body.document(div)