import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {useAppDispatch} from "../../store/hook";
import {updateCharacter} from "../../store/turnorder/turnorderSlice";

interface Props {
    textValue: string
    textPlaceHolder: string
    character: TurnOrderCharacter
}

export const OrderColumnComponent = ({textValue, textPlaceHolder, character}: Props) => {

    const [text, setText] = useState<string>(textValue);
    const dispatch = useAppDispatch()

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
        <TextField key={character.id} onChange={e => handleTextChange(character.id, e)} fullWidth
                   onBlur={e => handleBlurEvent(character, e)}
                   variant="standard" value={text} placeholder={textPlaceHolder}/>
    );
}