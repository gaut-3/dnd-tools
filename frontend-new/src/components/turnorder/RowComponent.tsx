import * as React from 'react';
import {Fragment} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {OrderColumnComponent} from "./OrderColumnComponent";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TurnOrderCharacter} from "../../models/TurnOrderCharacter";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from "../../store/hook";
import {deleteCharacter} from "../../store/turnorder/turnorderSlice";
import {TextField} from "@mui/material";
import {createUseStyles} from 'react-jss'
import {CharacterNameComponent} from "./CharacterNameComponent";

interface Props {
    character: TurnOrderCharacter
}

const useStyles = createUseStyles({
    noBorder: {
        border: "none"
    }
})

export const RowComponent = ({character}: Props) => {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const deleteCharacterHandler = () => {
        dispatch(deleteCharacter(character.id))
    }

    return (
        <Fragment>
            <TableRow data-id={character.id} sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell className={open ? classes.noBorder : ""}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell className={open ? classes.noBorder : ""}>
                    <CharacterNameComponent textValue={character.name}
                                          textPlaceHolder="Name"
                                          character={character}/>
                </TableCell>
                <TableCell className={open ? classes.noBorder : ""} align="right">
                    <OrderColumnComponent textValue={character.initiative.toString()}
                                          textPlaceHolder="Initiative"
                                          character={character}/>
                </TableCell>
                <TableCell className={open ? classes.noBorder : ""} align="right">
                    <OrderColumnComponent textValue={character.ac} textPlaceHolder="Armor Class"
                                          character={character}/>
                </TableCell>
                <TableCell className={open ? classes.noBorder : ""} align="right">
                    <OrderColumnComponent textValue={character.hp} textPlaceHolder="Health"
                                          character={ character}/>
                </TableCell>
                <TableCell className={open ? classes.noBorder : ""} align="right">
                    <OrderColumnComponent textValue={character.comment} textPlaceHolder="Comment"
                                          character={character}/>
                </TableCell>
                <TableCell className={open ? classes.noBorder : ""} align="center">
                    <IconButton onClick={deleteCharacterHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={open ? "" : classes.noBorder} style={{paddingBottom: 0, paddingTop: 0}}
                           colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <TextField fullWidth minRows={5} value={character.description} multiline></TextField>
                            {/* <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TextField multiline></TextField>

                                    { character.description.map((row) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                test
                                            </TableCell>
                                        </TableRow>
                                    )) }
                                </TableBody>
                            </Table>*/}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}