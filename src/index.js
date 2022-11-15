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

// for the changing secret Only in development
// import { createGames } from './modules/api/api.js';
// createGames().then((res) => console.log(res));