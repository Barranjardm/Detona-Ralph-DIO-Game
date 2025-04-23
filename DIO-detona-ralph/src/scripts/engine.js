const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 700,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions: {
        timerId: null,
        countDownTimeId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        resetGame(); // Reiniciar o jogo
    }
}

function resetGame() {
    // Limpar intervalos ativos
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimeId);

    // Resetar valores do estado
    state.values.curretTime = 60;
    state.values.result = 0;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;

    // Remover inimigos da tela
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Reiniciar o jogo
    moveEnemy();
    state.actions.countDownTimeId = setInterval(countDown, 1000);
}

function playSound(){
    let audio = new Audio("../audios/src_audios_src_audios_hit.m4a");
    audio.volume = 1.0;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();