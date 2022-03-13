import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {DnDDates} from "../../models/DnDDate";
import AuthService from "../../services/AuthService";
import DnDDateService from "../../services/DnDDateService";

interface DndDatesState {
    dndDates: DnDDates
}

const initialState: DndDatesState = {
    dndDates: {
        _id: "",
        uuid: "",
        dates: [],
    }
}

export const dndDatesSlice = createSlice({
    name: 'dndDates',
    initialState,
    reducers: {
        updateDnDDates: (state, {payload: dndDates}: PayloadAction<DnDDates>) => {
            DnDDateService.updateDnDDates(
                dndDates.uuid, AuthService.getCurrentUserToken(), dndDates
            )
            state.dndDates = dndDates;
        },
        getDnDDates: (state, {payload: dndDates}: PayloadAction<DnDDates>) => {
            const apiDnDDates = DnDDateService.getDnDDates(
                dndDates.uuid
            );
            if (apiDnDDates) {
                state.dndDates = apiDnDDates
            }
        }
    }
})

export const {
    updateDnDDates, getDnDDates
} = dndDatesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dndDates

export const dndDatesReducer = dndDatesSlice.reducer