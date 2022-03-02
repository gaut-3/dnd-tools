import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {updateCharacter} from "../../store/turnorder/turnorderSlice";

interface Props {
    textValue: string
    textPlaceHolder: string
    character: TurnOrderCharacter
}

export const CharacterNameComponent = ({textValue, textPlaceHolder, character}: Props) => {

    const [text, setText] = useState<string>(textValue);
    const dispatch = useAppDispatch()
    const monsters = useAppSelector((state) => state.monsters)

    useEffect(() => {
        setText(textValue)
    }, [character])

    const handleTextChange = (characterId: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setText(event.target.value)
    }

    const handleBlurEvent = (character: TurnOrderCharacter, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let updatedCharacter = {...character};
        updatedCharacter.name = event.target.value

        dispatch(updateCharacter(updatedCharacter))
    }

    const handleAutocompleteChange = (e: React.SyntheticEvent) => {
        console.log("handleCasdfasdf")
        if (e != null && e.currentTarget.innerHTML != null) {
            console.log(e.currentTarget.innerHTML)
            const name = e.currentTarget.innerHTML
            let monster = monsters.monsters.filter(value => value.name == name);
            let updatedCharacter = {...character};
            updatedCharacter.name = monster[0].name ? monster[0].name : ""
            updatedCharacter.ac = monster[0].armor_class ? monster[0].armor_class.toString() : ""
            updatedCharacter.hp = monster[0].hit_points ? monster[0].hit_points.toString() : ""

            dispatch(updateCharacter(updatedCharacter))
        }
    }

    return (
        <Autocomplete
            style={{minWidth: 200, maxWidth: 200}}
            onInputChange={e => handleAutocompleteChange(e)}
            freeSolo value={text}
            placeholder={textPlaceHolder}
            options={monsters.monsters.map((option) => option.name)}
            renderInput={(params) => <TextField onChange={e => handleTextChange(character.id, e)}
                                                onBlur={e => handleBlurEvent(character, e)} {...params}/>}
        />

    );
}