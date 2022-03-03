import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {updateCharacter} from "../../store/turnorder/turnorderSlice";

interface Props {
    textPlaceHolder: string
    character: TurnOrderCharacter
}

export const CharacterNameComponent = ({textPlaceHolder, character}: Props) => {

    const [text, setText] = useState(character.name);
    const dispatch = useAppDispatch()
    const monsters = useAppSelector((state) => state.monsters)

    useEffect(() => {
        setText(character.name)
    }, [character.name])


    const handleBlurEvent = (character: TurnOrderCharacter, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let updatedCharacter = {...character};
        updatedCharacter.name = event.target.value

        dispatch(updateCharacter(updatedCharacter))
    }

    const handleAutocompleteChange = (e: React.SyntheticEvent, name: string | null | undefined) => {

        if (name) {
            let monster = monsters.monsters.find(value => value.name === name);
            let updatedCharacter = {...character};
            if (monster) {
                updatedCharacter.name = monster.name ? monster.name : ""
                updatedCharacter.ac = monster.armor_class ? monster.armor_class.toString() : ""
                updatedCharacter.hp = monster.hit_points ? monster.hit_points.toString() : ""
            } else {
                updatedCharacter.name = name
            }
            dispatch(updateCharacter(updatedCharacter))
        }
    }

    return (
        <Autocomplete
            style={{minWidth: 200, maxWidth: 200}}
            onChange={(e : any, newValue: string | null | undefined) => handleAutocompleteChange(e, newValue)}

            freeSolo
            value={text}
            placeholder={textPlaceHolder}
            options={monsters.monsters.map((option) => option.name)}
            renderInput={(params) => <TextField
                                                onBlur={e => handleBlurEvent(character, e)} {...params}/>}
        />

    );
}