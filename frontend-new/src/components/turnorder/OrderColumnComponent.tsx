import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {updateCharacter} from "../../store/turnorder/turnorderSlice";
import {createUseStyles} from "react-jss";

interface Props {
    textValue: string
    textPlaceHolder: string
    character: TurnOrderCharacter
}

const useStyles = createUseStyles({
    normalWidth: {
        minWidth: 70, maxWidth: 70
    },
    commentWidth: {
        minWidth: 200, maxWidth: 200
    }
})


export const OrderColumnComponent = ({textValue, textPlaceHolder, character}: Props) => {

    const [text, setText] = useState<string>(textValue);
    const classes = useStyles()
    const dispatch = useAppDispatch()

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
            case 'AC':
                updatedCharacter.ac = event.target.value
                break
            case 'HP':
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
                   className={textPlaceHolder === "Comment" ? classes.commentWidth : classes.normalWidth}
                   onBlur={e => handleBlurEvent(character, e)}
                   value={text}
                   placeholder={textPlaceHolder}/>
    );
}