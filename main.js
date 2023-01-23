import { MOCK_CARDS, TECHNOLOGIES_URL } from './constants';
import './style.css';

// SETUP
const appElement = document.querySelector('#app');

const getModalTemplate = () => `
<div id="js-modal" class="js-modal">
  <div class="modal-header">
    <h2 id="modal-title"></h2>
    <button id="modal-close">❌</button>
  </div>
  <div class="modal-body"></div>
</div>
`;

const getContainerTemplate = () => `
<div id="js-gallery" class="js-gallery">
  <h1>Loading... ⌚</h1>
</div>
`;

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

// LOGIC
const galleryElement = document.querySelector('#js-gallery');
const loadingElement = document.querySelector('#js-gallery > h1');
const ModalElement = document.querySelector('#js-modal');

let cards;

const setupStars = (score) => {
  if (!score) {
    return `<p class="no-rating">No rating</p>`;
  }

  let starContainer = [];

  for (let i = 1; i < score; i++) {
    starContainer.push(`<span class="star">⭐</span>`);
  }

  return starContainer.join('');
};

const getCardTemplate = ({ name, logo, score }) => `
<div class="card" role="button">
  <h3>${name}</h3>

  <div class="image-container">
    <img src="${logo}" alt="${name}" />
  </div>

  <div class="score-container">${setupStars(score)}</div>
</div>
`;

const setupCards = () => {
  loadingElement.remove();

  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

const handleOpenModal = () => {
  ModalElement.style.display = 'block';
};

const addCardsListeners = () => {
  const cards = document.querySelectorAll('.js-gallery .card');
  cards.forEach((card) => card.addEventListener('click', handleOpenModal));
};

const getTechnologies = async () => {
  try {
    const res = await fetch(TECHNOLOGIES_URL);
    const cardsData = await res.json();

    cards = cardsData;
    setupCards();
    addCardsListeners();
  } catch (err) {
    console.log(err);
    cards = MOCK_CARDS;
    setupCards();
    addCardsListeners();
  }
};

const addModalListeners = () => {
  const closeButton = document.querySelector('#js-modal #modal-close');
  closeButton.addEventListener('click', () => {
    ModalElement.style.display = 'none';
  });
};

getTechnologies();
addModalListeners();
