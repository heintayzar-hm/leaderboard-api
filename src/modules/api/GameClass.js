import { API } from './api.js';
import { encodeHTMLEntities, onlySpaces } from './util.js';

export default class Game extends API {
  constructor() {
    super();
    this.addSuccess = 'Leaderboard score created correctly.';
    this.data = [];
  }

  add = () => {
    const form = document.getElementById('add-score-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (onlySpaces(e.target.children[0].value) || onlySpaces(e.target.children[1].value)) {
        this.msg('Successfully falied no full of spaces', false);
      } else {
        await this.addApi({
          user: e.target.children[0].value,
          score: e.target.children[1].value,
        })
          .then((res) => {
            if (res === this.addSuccess) {
              e.target.reset();
              this.display();
              this.msg('Successfully Added', true);
            }
          }).catch((error) => {
            this.msg('Successfully Failed', false);
            throw new Error(error);
          });
      }
    });
  }

  refresh = async () => {
    this.data = await this.refreshApi();
    return this.data;
  }

  display = async () => {
    const scoreTable = document.querySelector('.score-table');
    await this.refresh().then((res) => {
      scoreTable.innerHTML = '';
      res.forEach((score) => {
        scoreTable.innerHTML += this.score(score);
      });
    });
  }

  score = ({ user, score }) => `<li>${encodeHTMLEntities(user)} <span class="score">${encodeHTMLEntities(score)}</span></li>`

  msg = (text, bool) => {
    const msg = document.querySelector('.msg');
    msg.innerHTML = '';
    msg.innerHTML = text;
    if (bool) {
      msg.classList.add('success');
      msg.classList.remove('fail');
    } else {
      msg.classList.remove('success');
      msg.classList.add('fail');
    }
  }
}