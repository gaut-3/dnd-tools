import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import monstersFromJson from './../../resources/monsters5e.json';
import {Welcome} from "../../models/Monster";


interface MonsterState {
    monsters: Welcome[]
}

const getMonstersFromFile = (): Welcome[] => {
    const monster = monstersFromJson;
    return monster
}

// Define the initial state using that type
const initialState: MonsterState = {
    monsters: getMonstersFromFile()
}


export const monsterSlice = createSlice({
    name: 'characterList',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        getMonstersName: (state) => {
            //state.idCounter = state.idCounter + 1
        }

    },
})

export const {
    getMonstersName,
} = monsterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.monsters

export const monsterReducer = monsterSlice.reducer