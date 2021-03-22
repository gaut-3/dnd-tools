import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/dmcharacters/';

class CharactersService {
    getAllCharacters() {
        return axios.get(API_URL + 'all', {headers: authHeader()});
    }

    addNewCharacter(isNonPlayer) {
        return axios.post(API_URL + 'create', {
            "name": "test",
            "nonPlayer": isNonPlayer
        }, {headers: authHeader()})
    }

    deleteCharacter(id) {
        return axios.delete(API_URL + 'delete?id=' + id, {headers: authHeader()})
    }

    updateCharacter(id,
                    nameInput,
                    raceInput,
                    armorClass,
                    isNonPlayer,
                    health,
                    comment) {
        return axios.patch(API_URL + 'update',
            {
                "id": id,
                "name": nameInput,
                "race": raceInput,
                "health": health,
                "armorClass": armorClass,
                "comment": comment,
                "nonPlayer": isNonPlayer
            }
            , {headers: authHeader()})
    }
}

export default new CharactersService();
