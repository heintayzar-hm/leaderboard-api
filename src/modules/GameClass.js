import { API } from './api/api.js';
import {
  disableBtn, enableBtn, encodeHTMLEntities, onlySpaces,
} from './util.js';

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
      disableBtn(e.target.children[3]);
      if (onlySpaces(e.target.children[0].value) || onlySpaces(e.target.children[1].value)) {
        this.msg('Successfully failed: no full of spaces', false);
        enableBtn(e.target.children[3]);
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
              enableBtn(e.target.children[3]);
            }
          }).catch((error) => {
            this.msg('Successfully Failed', false);
            enableBtn(e.target.children[3]);
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
    const refresh = document.querySelector('.refresh');
    disableBtn(refresh);
    this.reload(true);
    await this.refresh().then((res) => {
      scoreTable.innerHTML = '';
      this.reload(false);
      res.forEach((score) => {
        scoreTable.innerHTML += this.score(score);
      });
      enableBtn(refresh);
    }).catch((error) => {
      this.reload(false);
      this.msg('Loading Failed', false);
      enableBtn(refresh);
      throw new Error(error);
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

  reload = (bool) => {
    let wrapper = document.querySelector('.wrapper');
    if (wrapper === null) {
      document.querySelector('.score-table').innerHTML += '<li class="wrapper"><div class="loader"></div></li>';
      wrapper = document.querySelector('.wrapper');
    }
    if (bool) {
      wrapper.style.display = 'flex';
    } else {
      wrapper.style.display = 'none';
    }
  }
}