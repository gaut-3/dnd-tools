import * as React from 'react';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {updateCharacter} from "../../store/turnorder/turnorderSlice";

interface Props {
    textValue: string
    textPlaceHolder: string
    character: TurnOrderCharacter
}

export const OrderColumnComponent = ({textValue, textPlaceHolder, character}: Props) => {

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
        switch (textPlaceHolder) {
            case 'Name':
                updatedCharacter.name = event.target.value
                break
            case 'Initiative':
                updatedCharacter.initiative = Number(event.target.value)
                break
            case 'Armor Class':
                updatedCharacter.ac = event.target.value
                break
            case 'Health':
                updatedCharacter.hp = event.target.value
                break
            case 'Comment':
                updatedCharacter.comment = event.target.value
                break
        }

        dispatch(updateCharacter(updatedCharacter))
    }

    return (
        <TextField key={character.id}
                   onChange={e => handleTextChange(character.id, e)}
                   style={{minWidth: 60}}
                   onBlur={e => handleBlurEvent(character, e)}
                   value={text}
                   placeholder={textPlaceHolder}/>
    );
}