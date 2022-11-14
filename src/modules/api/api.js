import axios from 'axios';

const baseUrl = process.env.BASE_API_URL;
const createGames = async () => {
  try {
    const res = await axios.post(`${baseUrl}games/`, {
      name: 'My cool new game',
    });
    console.log(res.data.result);
  } catch (error) {
    return error;
  }
};

export {
  createGames,
};