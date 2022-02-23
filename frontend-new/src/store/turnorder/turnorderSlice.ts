import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {Cookies} from "react-cookie";

interface TurnOrderState {
    characterList: TurnOrderCharacter[]
    idCounter: number;
}

const initPlayerCharacter = (name: string, idCounter: number): TurnOrderCharacter => {
    const newCharacter = {
        id: idCounter,
        name: name,
        initiative: 0,
        ac: "",
        hp: "",
        comment: "",
        description: "",
        isPlayer: true
    };

    return newCharacter
}

const initPlayerCharacters = () => {
    let playerCharacters = [initPlayerCharacter("Aliondras Cantores", 1),
        initPlayerCharacter("Jamtorin", 2),
        initPlayerCharacter("Maviel", 3),
        initPlayerCharacter("Wunwun", 4),
        initPlayerCharacter("Zokora", 5)]

    return playerCharacters
}

const getCharactersFromCookie = (): TurnOrderCharacter[] => {
    const cookies = new Cookies();
    const turnOrderCookie = cookies.get('turnorder')
    if (turnOrderCookie) {
        let turnOrder = JSON.parse(JSON.stringify(turnOrderCookie));
        return sortList(turnOrder.characters);
    }

    return initPlayerCharacters()
}

const sortList = (characterList: TurnOrderCharacter[]): TurnOrderCharacter[] => {
    const sortedList = characterList.sort((char1, char2) =>
        (Number(char1.initiative) > Number(char2.initiative)) ? -1 : 1
    )

    console.log(sortedList)

    return sortedList
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
                initiative: 0,
                ac: "",
                hp: "",
                comment: "",
                description: "",
                isPlayer: false
            };
            state.characterList.push(newCharacter);
        },
        addPlayerCharacter: (state, {payload: name}: PayloadAction<string>) => {
            state.idCounter = state.idCounter + 1
            const newCharacter = {
                id: state.idCounter,
                name: name,
                initiative: 0,
                ac: "",
                hp: "",
                comment: "",
                description: "",
                isPlayer: true
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
        sortCharacterList: (state) => {
            state.characterList = sortList(state.characterList)
        },
        resetCharacterList: (state) => {
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
            cookies.set("turnorder", turnorder, {
                path: "/",
                maxAge: 31536000
            })
        },
        addCounter: (state) => {
            state.idCounter = state.idCounter + 1
        }
    },
})

export const {
    addCharacter,
    addPlayerCharacter,
    deleteCharacter,
    updateCharacter,
    sortCharacterList,
    resetCharacterList,
    syncCharacterList,
} = turnorderSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.turnOrder

export const turnorderReducer = turnorderSlice.reducer