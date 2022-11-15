import axios from 'axios';

const baseUrl = process.env.BASE_API_URL || 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const createGames = async () => {
  try {
    const res = await axios.post(`${baseUrl}games/`, {
      name: 'My cool new game',
    });
    return (res.data.result);
  } catch (error) {
    return error;
  }
};

class API {
  constructor() {
    this.id = process.env.GAME_ID || '3rRxeZ2zHc2U0l3ZypH9';
    this.url = baseUrl;
  }

  addApi = async ({ user, score }) => {
    try {
      const res = await axios.post(`${this.url}games/${this.id}/scores`, {
        user,
        score,
      });
      if (res.status === 201) {
        return (res.data.result);
      }
      throw new Error('Adding failed');
    } catch (error) {
      throw new Error('Adding failed');
    }
  }

  refreshApi = async () => {
    try {
      const res = await axios.get(`${this.url}games/${this.id}/scores`);
      if (res.status === 200) {
        return (res.data.result);
      }
      throw new Error('No data , Operation failed');
    } catch (error) {
      throw new Error('No data , Operation failed');
    }
  }
}

export {
  API,
  createGames,
};