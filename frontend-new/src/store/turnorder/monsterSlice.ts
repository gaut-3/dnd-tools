import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {Cookies} from "react-cookie";
import playerCharactersConfig from './../../resources/playerCharacter.json';
import monstersFromJson from './../../resources/monsters5e.json';
import { Welcome} from "../../models/Monster";


interface MonsterState {
    monsters: Welcome[]
}

const getMonstersFromFile = (): Welcome[] => {
    let monstersFromJson2 = monstersFromJson;
    let monstersFromJson1 = monstersFromJson2;
    //let monsters = Convert.toWelcome(monstersFromJson);
    const monster = monstersFromJson;
    console.log(monster)
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