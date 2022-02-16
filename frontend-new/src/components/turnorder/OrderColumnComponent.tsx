import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

interface Props {
    textValue: string
    textPlaceHolder: string
    characterId: number
}

export const OrderColumnComponent = ({textValue, textPlaceHolder, characterId}: Props) => {

    const [text, setText] = useState<string>(textValue);

    const handleTextChange = (characterId: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setText(event.target.value)
    }

    const columnTextField = (): ReturnType<typeof TextField> => {
        if (text === "" || text === "0") {
            return <TextField key={characterId} onChange={e => handleTextChange(characterId, e)} fullWidth
                              variant="standard" placeholder={textPlaceHolder}/>
        } else {
            return <TextField key={characterId} onChange={e => handleTextChange(characterId, e)} fullWidth
                              variant="standard" value={text}/>
        }
    }

    return (
        columnTextField()
    );
}