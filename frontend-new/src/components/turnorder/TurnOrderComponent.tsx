import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {RowComponent} from "./RowComponent";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {Button} from "@mui/material";
import {
    addCharacter,
    resetCharacterList,
    sortCharacterList,
    syncCharacterList
} from "../../store/turnorder/turnorderSlice";

export const TurnOrderComponent = () => {

    const turnOrder = useAppSelector((state) => state.turnOrder)
    const dispatch = useAppDispatch()
    console.log(turnOrder.characterList)

    const handleAddEvent = () => {
        dispatch(addCharacter());
    }

    const handleSyncEvent = () => {
        dispatch(syncCharacterList())
    }

    const handleResetEvent = () => {
        dispatch(resetCharacterList())
    }

    const handleSortEvent = () => {
        dispatch(sortCharacterList())
    }

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
                        {turnOrder.characterList.map((character) => (
                            <RowComponent character={character}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleAddEvent}>Add</Button>
            <Button variant="contained" onClick={handleSortEvent}>Sort</Button>
            <Button variant="contained" onClick={handleResetEvent}>Reset</Button>
            <Button variant="contained" onClick={handleSyncEvent}>Sync</Button>
        </div>
    );
}