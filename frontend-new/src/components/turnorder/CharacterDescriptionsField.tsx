import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {useAppDispatch} from "../../store/hook";
import {updateCharacter} from "../../store/turnorder/turnorderSlice";

interface Props {
    character: TurnOrderCharacter
}

export const CharacterDescriptionField = ({character}: Props) => {

    const [text, setText] = useState(character.description);
    const dispatch = useAppDispatch()

    useEffect(() => {
        setText(character.description)
    }, [character])

    const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setText(event.target.value)
        console.log(text)
    }

    const handleBlurEvent = (character: TurnOrderCharacter, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let updatedCharacter = {...character};
        updatedCharacter.description = event.target.value
        dispatch(updateCharacter(updatedCharacter))
    }

    return (
        <TextField fullWidth minRows={5} defaultValue={text} multiline
                   onChange={e => handleTextChange}
                   onBlur={e => handleBlurEvent(character, e)}/>

    );
}