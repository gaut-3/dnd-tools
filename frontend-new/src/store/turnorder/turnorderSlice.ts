import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {Cookies} from "react-cookie";

interface TurnOrderState {
    characterList: TurnOrderCharacter[]
    idCounter: number;
}

const initPlayerCharacter = (name: string): TurnOrderCharacter => {
    const newCharacter = {
        id: 0,
        name: name,
        initiative: "",
        ac: "",
        hp: "",
        comment: "",
        description: "",
        isPlayer: true
    };

    return newCharacter
}

const initPlayerCharacters = (): TurnOrderCharacter[] =>  {
    let playerCharacters = [initPlayerCharacter("Aliondras Cantores"),
        initPlayerCharacter("Jamtorin"),
        initPlayerCharacter("Maviel"),
        initPlayerCharacter("Wunwun"),
        initPlayerCharacter("Zokora")]

    return playerCharacters
}

const getCharactersFromCookie = (): TurnOrderCharacter[] => {
    const cookies = new Cookies();
    const turnOrderCookie = cookies.get('turnorder')
    console.log(turnOrderCookie)
    if (turnOrderCookie) {
        console.log("testasdfasf")
        let turnOrder = JSON.parse(JSON.stringify(turnOrderCookie));
        const characterList = turnOrder.characters.sort((char1: TurnOrderCharacter, char2: TurnOrderCharacter) => {
            if (char1.initiative > char2.initiative) {
                return -1
            } else {
                return 1
            }
        })

        return characterList
    }

    return initPlayerCharacters()
}

const getIdCounterFromCookie = (): number => {
    const cookies = new Cookies();
    const turnOrderCookie = cookies.get('turnorder')
    if (turnOrderCookie) {
        let turnOrder = JSON.parse(JSON.stringify(turnOrderCookie));
        return turnOrder.idCounter
    }
    return 0
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
        addCharacter: (state) => {
            state.idCounter = state.idCounter + 1
            const newCharacter = {
                id: state.idCounter,
                name: "",
                initiative: "",
                ac: "",
                hp: "",
                comment: "",
                description: "",
                isPlayer: false
            };
            state.characterList.push(newCharacter);
        },
        addPlayerCharacter: (state, {payload: character}: PayloadAction<TurnOrderCharacter>) => {
            state.idCounter = state.idCounter + 1
            const newCharacter = {
                id: state.idCounter,
                name: character.name,
                initiative: character.initiative,
                ac: character.ac,
                hp: character.hp,
                comment: character.comment,
                description: character.description,
                isPlayer: false
            };
            state.characterList.push(newCharacter);
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
        resetCharacterList: (state ) => {
            state.characterList = []
            state.characterList = initPlayerCharacters()
        },
        syncCharacterList: (state) => {
            const cookies = new Cookies();
            let turnorder = {
                "characters": state.characterList,
                "idCounter": state.idCounter,
                "lastModified": new Date()
            }
            cookies.set("turnorder", turnorder)
        },
        addCounter: (state) => {
            state.idCounter = state.idCounter + 1
        }
    },
})

export const {addCharacter, deleteCharacter, updateCharacter, resetCharacterList, syncCharacterList} = turnorderSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.turnOrder

export const turnorderReducer = turnorderSlice.reducer