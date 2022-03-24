import axios from "axios";
import {DnDDates} from "../models/DnDDate";
import AuthService from "./AuthService";
import {Dispatch} from "@reduxjs/toolkit";
import {setAllDnDDates} from "../store/dndDatesSlice";

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

    addDnDDates = async (token: string, dndDates: DnDDates) => {
        let result = await axios.post(API_URL, {dndDates}, {
            headers: {"x-access-token": `${token}`},
        }).then((response: any) => {
            if (response.data != null && response.data.result) {
                return response.data.result;
            }
        });
        return await result;
    }

    getAllDnDDates = async (dispatch: Dispatch) => {
        let test = await axios.get(API_URL + "all/" + AuthService.getCurrentUserId(), {
            headers: {"x-access-token": `${AuthService.getCurrentUserToken()}`},
        }).then((response: any) => {
            if (response.data != null && response.data.data) {
                let dates: DnDDates[] = []
                dates = response.data.data;
                dispatch(setAllDnDDates(dates))
                //return dates
            }
        });
        return await test
    }

    deleteDnDDates(id: string) {
        axios.delete(API_URL + "all/" + id, {
            headers: {"x-access-token": `${AuthService.getCurrentUserToken()}`}
        }).then((response) => {
            if(response.status !== 200){
                console.log(response)
            }
        })
    }
}

export default new DnDDateService();
