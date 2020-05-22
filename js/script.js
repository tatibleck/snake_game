let canvas = document.getElementById('snake'); //chama o canvas id snake do index
let context = canvas.getContext('2d'); //renderiza o desenho que vai acontecer no canvas (no caso, trata o arquivo em plano 2d)
let box = 32; //quantidade de box (altura * largura)

//posição inicial da cobrinha
let snake = []; 
snake[0] = {
    x: 7 * box,
    y: 8 * box
}

//movimentação da cobrinha, iniciando pela direita
let direction = 'right'; 

//desenhando a comida no canvas
//random retorna um numero aleatorio até 1 e o floor tira esse 0, antes do numero
//15 + 1 é o comprimento e altura do nosso espaço de jogo a partir do meio da tela
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

    //criando o background (tela de jogo)
    function createrBG() {
        context.fillStyle = 'black'; //estilo do jogo 
        context.fillRect(0, 0, 16 * box, 16 * box); //desenha a área onde o jogo vai acontecer
    }

    //criando a cobrinha
    function createSnake() {
        for(i=0; i < snake.length; i++) {
            context.fillStyle = 'white';
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    //criando a comida
    function createFood() {
        context.fillStyle = 'grey'; 
        context.fillRect(food.x, food.y, box, box);
    }

    //event listener recebe o clique
    document.addEventListener('keydown', update);

    //definindo o evento quando é feito o clique
    //os numeros referem-se aos botões do teclado (ver https://keycode.info)
    function update(event) {
        if(event.keyCode == 37 && direction != 'right') direction = 'left'; 
        if(event.keyCode == 38 && direction != 'down') direction = 'up';
        if(event.keyCode == 39 && direction != 'left') direction = 'right';
        if(event.keyCode == 40 && direction != 'up') direction = 'down';
        //se o botão clicado for igual a direção pertenente a ele e diferente a direção oposta a ele, a cobrinha locomove-se para a direção correspondente
        //não tem como fazer o caminho inverso da cobrinha, senão ela teria que ter duas cabeças nesse caso, por ex esta indo para a esquerda e clicar para ir para a direita
    }

    //iniciando o jogo
    function startGame() {
        //plano cartesiano: eixo X e eixo Y, um até 16 e outro até -16 (nossa box é tamanho 32)
        if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
        if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
        if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

        //quando a posição 1 da cobrinha (corpo) se chocar com outra parte do corpo ou cabeça, um alert é mostrado na tela
        for(i = 1; i < snake.length; i++){
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Perdeu :/')
            }
        }

        createrBG();
        createSnake();
        createFood();
        
         //posição x e y iniciais da cobrinha
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        //condicionais para cada posição, adicionando ou diminuindo box (plano cartesiano)
        if (direction == 'right') snakeX += box; 
        if (direction == 'left') snakeX -= box;
        if (direction == 'up') snakeY -= box;
        if (direction == 'down') snakeY += box;

        //se a posição da cobrinha for diferente da posição da comida, retira o último elemento da cobrinha
        //se não, acrescenta um elemento a cobrinha e gera aleatoriamente outra comida
        if(snakeX != food.x || snakeY != food.y){
            snake.pop();
        }
        else {
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }

        //acrescenta um elemento a frente do array (criar a cabeça dela)
        let newHead = {
            x: snakeX,
            y: snakeY
        }

        //o unshift adiciona um ou mais elementos no início do array e retorna o número de elementos atualizado
        snake.unshift(newHead);
    
    }

let jogo = setInterval(startGame, 120); //a cada x milissegundos o jogo atualiza
