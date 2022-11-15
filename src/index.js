import './styles.css';
import Game from './modules/api/GameClass.js';

const game = new Game();
game.add();
game.display();

const refresh = document.querySelector('.refresh');

refresh.addEventListener('click', (e) => {
  game.display();
  e.preventDefault();
});
