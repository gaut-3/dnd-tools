import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/dmcharacters/';

class CharactersService {
    getAllCharacters() {
        return axios.get(API_URL + 'all', {headers: authHeader()});
    }

    addNewCharacter() {
        return axios.post(API_URL + 'create', {headers: authHeader()})
    }
}

export default new CharactersService();
