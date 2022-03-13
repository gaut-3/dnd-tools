import axios from "axios";
import {DnDDates} from "../models/DnDDate";

const API_URL = "/api/dnddates/";

class DnDDateService {
    updateDnDDates(uuid: string, token: string, dndDates: DnDDates) {
        axios.put(API_URL + uuid, {dndDates}, {
            headers: {"x-access-token": `${token}`},
        });

    }

    getDnDDates(uuid: string): DnDDates | null {
        axios.get(API_URL + uuid)
            .then((response: any) => {
                if (response.data != null && response.data.data) {
                    return response.data.data;
                }
            });
        return null
    }
}

export default new DnDDateService();
