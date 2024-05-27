//URL:https://api.themoviedb.org/3/movie/now_playing?api_key=78fa9ce050f319831454ab2438c00b1e&language=pt-BR
//Base:https://api.themoviedb.org/3/

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;