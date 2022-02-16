import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Cookies} from 'react-cookie';
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import {RowComponent} from "./RowComponent";


const getCharactersFromCookie = (): TurnOrderCharacter[] => {
    const cookies = new Cookies();
    cookies.set("turnorder", "{\"characters\":[{\"id\":1,\"name\":\"Zokora\",\"initiative\":\"4\",\"ac\":\"\",\"hp\":\"\",\"comment\":\"\",\"description\":\"asdfasd asd fas\"},{\"id\":2,\"name\":\"Colfindir\",\"initiative\":\"1\",\"ac\":\"\",\"hp\":\"\",\"comment\":\"\",\"description\":\"\"},{\"id\":3,\"name\":\"Monster\",\"initiative\":\"4\",\"ac\":\"15\",\"hp\":\"30\",\"comment\":\"\",\"description\":\"\"}],\"lastModified\":\"31.08.2021 13:00\"}")
    const turnOrderCookie = cookies.get('turnorder')
    let turnOrder = JSON.parse(JSON.stringify(turnOrderCookie));
    const characterList = turnOrder.characters.sort((char1 : TurnOrderCharacter, char2 : TurnOrderCharacter) => {
        if (char1.initiative > char2.initiative) {
            return -1
        } else {
            return 1
        }
    })
    return characterList;
}

export const TurnOrderComponent = () => {

    const [characterList, setCharacterList] = useState<TurnOrderCharacter[]>(getCharactersFromCookie());

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Initiative</TableCell>
                            <TableCell align="left">AC</TableCell>
                            <TableCell align="left">HP</TableCell>
                            <TableCell align="left">Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characterList.map((character) => (
                            <RowComponent character={character}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}