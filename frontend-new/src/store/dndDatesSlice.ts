import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {DnDDate, DnDDates} from "../models/DnDDate";
import AuthService from "../services/AuthService";
import DnDDateService from "../services/DnDDateService";
import axios from "axios";

interface DndDatesState {
    dndDates: DnDDates
    dndDatesList: DnDDates[]
}

const initialState: DndDatesState = {
    dndDates: {
        _id: "",
        name: "",
        uuid: "",
        dates: [],
        userId: null
    },
    dndDatesList: []
}

const getAllDnDDates2 = createAsyncThunk(
    'dndDates/getAllDnDDates2',
    async (thunkAPI) => {
        /* const apiDnDDates = await DnDDateService.getAllDnDDates().then((response: any) => {
             if (response) {
                 console.log("apidatesss", response)
                 return response
             }
         })
 */
        return await axios.get("/api/dnddates/all/" + AuthService.getCurrentUserId())
            .then((response: any) => {
                if (response.data != null && response.data.data) {
                    console.log("data", response.data.data)
                    let dates: DnDDates[] = []
                    dates = response.data.data;
                    console.log("daasss", dates)
                    return dates
                }
                return []
            })
    }
)

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
        addDnDDate: (state, {payload: dndDate}: PayloadAction<DnDDate>) => {
            state.dndDates.dates.push(dndDate);
        },
        setDnDDates: (state, {payload: dndDates}: PayloadAction<DnDDates>) => {
            state.dndDates = dndDates
        },
        getDnDDates: (state, {payload: dndDates}: PayloadAction<DnDDates>) => {
            const apiDnDDates = DnDDateService.getDnDDates(
                dndDates.uuid
            );
            if (apiDnDDates) {
                state.dndDates = apiDnDDates
            }
        },
        addDnDDates: (state, {payload: dndDates}: PayloadAction<DnDDates>) => {
            state.dndDatesList.push(dndDates)
            console.log(state.dndDatesList)
        },
        deleteOneDndDates: (state, {payload: id}: PayloadAction<string>) => {
            DnDDateService.deleteDnDDates(id)
            let temp = [...state.dndDatesList];
            temp.forEach((item, index) => {
                if (item._id === id) {
                    temp.splice(index, 1);
                }
            });
            state.dndDatesList = temp;
        },
        setAllDnDDates: (state, {payload: dndDatesList}: PayloadAction<DnDDates[]>) => {
            state.dndDatesList = dndDatesList
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllDnDDates2.fulfilled, (state, action) => {
            // Add user to the state array
            state.dndDatesList = action.payload
            console.log("red", action.payload)
        })
    },
})

export const {
    updateDnDDates, getDnDDates, addDnDDates, setAllDnDDates, deleteOneDndDates, addDnDDate, setDnDDates
} = dndDatesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dndDates

export const dndDatesReducer = dndDatesSlice.reducer
