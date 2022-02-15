import * as React from 'react';
import {TextField} from '@mui/material';

interface Props {
    textValue: string
    textPlaceHolder: string
    key: number
}

export const OrderColumnComponent = ({textValue, textPlaceHolder, key}: Props) => {

    const changeText = (key: number, textValue: string): void => {

    }

    const columnTextField = (): ReturnType<typeof TextField> => {
        if (textValue === "" || textValue === "0") {
            return <TextField key={key} fullWidth variant="standard" placeholder={textPlaceHolder}/>
        } else {
            return <TextField fullWidth variant="standard" value={textValue}/>
        }
    }

    return (
        columnTextField()
    );
}