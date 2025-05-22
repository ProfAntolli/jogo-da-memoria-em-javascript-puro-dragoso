const cartas = [
    '💻', '💻',
    '🕹️', '🕹️',
    '🤖', '🤖',
    '👾', '👾',
    '🛰️', '🛰️',
    '⚙️', '⚙️',
    '📡', '📡',
    '🔒', '🔒'
];

let cartaVirada = null;
let bloqueio = false;
const tabuleiro = document.getElementById('tabuleiro');

function embaralhar(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function criarTabuleiro() {
    const embaralhadas = embaralhar([...cartas]);
    tabuleiro.innerHTML = '';
    embaralhadas.forEach(simbolo => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.simbolo = simbolo;
        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

function virarCarta() {
    if (bloqueio) return;
    if (this === cartaVirada) return;

    this.classList.add('virada');
    this.textContent = this.dataset.simbolo;

    if (!cartaVirada) {
        cartaVirada = this;
        return;
    }

    if (this.dataset.simbolo === cartaVirada.dataset.simbolo) {
        cartaVirada = null;
    } else {
        bloqueio = true;
        setTimeout(() => {
            this.classList.remove('virada');
            this.textContent = '';
            cartaVirada.classList.remove('virada');
            cartaVirada.textContent = '';
            cartaVirada = null;
            bloqueio = false;
        }, 1000);
    }
}

criarTabuleiro();
