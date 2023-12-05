const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'vasco',
  'inter',
  'gremio',
  'flamengo',
  'palmeiras',
  'corinthians',
  'cuiaba',
  'cap',
  'galo',
  'bahia',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    time = timer.innerHTML;
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${time}`);
    
    bestTime = localStorage.getItem("bestTime")
    if (!bestTime || (bestTime > time)) {
      player = localStorage.getItem("player")
      localStorage.setItem("bestTime", time);
      localStorage.setItem("bestPlayer", player)
    }
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const load = () => {
  window.location.reload()
}

const out = () => {
  localStorage.removeItem("player")
  window.location = '../index.html';
}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const setBestPlayerDiv = () => {
  player = localStorage.getItem("bestPlayer")
  time = localStorage.getItem("bestTime")

  if(player && time) {
    const divBestPlayer = document.createElement('header');
    divBestPlayer.classList.add('bestPlay')
    divBestPlayer.innerHTML = `
      <h5 style='text-align:center'>Melhor jogada</h5>
      <div>
      <h6>Jogador: ${player}</h6>
      </div>
      <div>
      <h6>tempo: ${time}s</h6>
      </div>
    `;

    header = document.getElementsByClassName('head')[0]
    header.appendChild(divBestPlayer)
  }
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
  setBestPlayerDiv();
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
