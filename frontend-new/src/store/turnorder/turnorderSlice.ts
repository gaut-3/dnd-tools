import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {Cookies} from "react-cookie";

// Define a type for the slice state
interface TurnOrderState {
    characterList: TurnOrderCharacter[]
    idCounter: number;
}


const getCharactersFromCookie = (): TurnOrderCharacter[] => {
    const cookies = new Cookies();
    cookies.set("turnorder", '{"characters":[{"id":1,"name":"Zokora","initiative":"4","ac":"","hp":"","comment":"","description":"asdfasd asd fas"},{"id":2,"name":"Colfindir","initiative":"1","ac":"","hp":"","comment":"","description":""},{"id":3,"name":"Monster","initiative":"4","ac":"15","hp":"30","comment":"","description":""}],"lastModified":"31.08.2021 13:00","idCounter":4}')
    const turnOrderCookie = cookies.get('turnorder')
    let turnOrder = JSON.parse(JSON.stringify(turnOrderCookie));
    const characterList = turnOrder.characters.sort((char1: TurnOrderCharacter, char2: TurnOrderCharacter) => {
        if (char1.initiative > char2.initiative) {
            return -1
        } else {
            return 1
        }
    })
    return characterList;
}

const getIdCounterFromCookie = (): number => {
    const cookies = new Cookies();
    const turnOrderCookie = cookies.get('turnorder')
    let turnOrder = JSON.parse(JSON.stringify(turnOrderCookie));
    return turnOrder.idCounter
}


// Define the initial state using that type
const initialState: TurnOrderState = {
    characterList: getCharactersFromCookie(),
    idCounter: getIdCounterFromCookie()
}


export const turnorderSlice = createSlice({
    name: 'characterList',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addCharacter: (state, {payload: character}: PayloadAction<TurnOrderCharacter>) => {
            state.characterList.push(character);
            state.idCounter = state.idCounter + 1
        },
        deleteCharacter: (state, {payload: characterId}: PayloadAction<number>) => {
            state.characterList.forEach((item, index) => {
                if (item.id === characterId) {
                    state.characterList.splice(index, 1);
                }
            });
        },
        updateCharacter: (state, {payload: character}: PayloadAction<TurnOrderCharacter>) => {
            state.characterList.forEach((item, index) => {
                if (item.id === character.id) {
                    item.name = character.name
                    item.initiative = character.initiative
                    item.ac = character.ac
                    item.hp = character.hp
                    item.comment = character.comment
                    item.description = character.description
                }
            });
        },
    },
})

export const {addCharacter, deleteCharacter, updateCharacter} = turnorderSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.turnOrder

export const turnorderReducer = turnorderSlice.reducer