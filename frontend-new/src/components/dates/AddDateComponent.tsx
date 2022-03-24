import React, {ChangeEvent, useState} from "react";
import {Box, Grid, List, ListItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {DnDDate, DnDDates} from "../../models/DnDDate";
import {DatePicker} from "@mui/lab";
import {format} from "date-fns";

interface Props {
    dndDates: DnDDates
    addNewDate: (dndDate: DnDDate) => void
}

export const AddDateComponent = ({dndDates, addNewDate}: Props) => {

    const [players, setPlayers] = useState<string[]>([""]);
    const [datePickerValue, setDatePickerValue] = useState<Date | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const dndDate = datePickerValue;
        const comment = data.get('comment');
        console.log("dbddate", dndDate)
        if (dndDate != null && players != null && comment != null) {
            const commentString = comment.toString()
            const dndDateString = format(dndDate, 'MM.dd.yyyy');
            let sortedPlayers = sortPlayers(players);
            const checkIfExists = dndDates.dates.find(item => item.date === dndDateString);
            if (!checkIfExists) {
                const newDndDate: DnDDate = {
                    "date": dndDateString,
                    "players": sortedPlayers,
                    "comment": commentString,
                }
                addNewDate(newDndDate)
            }
        }
    };

    const sortPlayers = (players: string[]): string[] => {
        return players.map(element => {
            return element.trim();
        }).sort((a, b) =>
            a.localeCompare(b)
        )
    }

    const deleteDateHandler = (index: number) => {
        let temp = [...players]
        temp.splice(index, 1)
        setPlayers(temp)
    }

    const addNewPlayerTextField = () => {
        let temp = [...players]
        temp.push("")
        setPlayers(temp)
        console.log("players", players)
    }

    const addNewPlayerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        let temp = [...players]
        temp[index] = e.currentTarget.value
        setPlayers(temp)
    }

    const handleDatePickerChange = (newValue: Date | null) => {
        setDatePickerValue(newValue);
    };

    return (
        <Box sx={{paddingLeft: 2, paddingRight: 2}} component="form" onSubmit={handleSubmit} noValidate>
            <Grid spacing={2} container>
                <Grid item xs={3}>
                    <DatePicker
                        inputFormat="dd.MM.yyyy"
                        disableMaskedInput={true}
                        label="Datum"
                        value={datePickerValue}
                        onChange={handleDatePickerChange}
                        renderInput={(params) => <TextField {...params} name="dndDate" id="dndDate"/>}
                    />
                </Grid>
                <Grid item xs={9}>
                    <TextField fullWidth label="Comment" name="comment" id="comment"/>
                </Grid>
                <Grid style={{paddingLeft: 0, paddingTop: 0}} item xs={12}>
                    <List>
                        {players.map((player, index) => (
                            <ListItem style={{paddingRight: 0}} key={player + index}>
                                <TextField fullWidth value={player} onChange={e => addNewPlayerHandler(e, index)}
                                           label="Player" name="Player"/>
                                <IconButton onClick={e => deleteDateHandler(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                    {/*<Grid spacing={1} direction="row" justifyContent={"right"} alignItems="right"
                          alignContent={"right"} container>
                        {players.map((player, index) => (
                            <Grid key={player+index} spacing={1} direction="row" justifyContent={"right"} alignItems="right"
                                  alignContent={"right"} container>
                                <Grid item xs={11}>
                                    <TextField fullWidth value={player} onChange={e => addNewPlayerHandler(e, index)}
                                               label="Player" name="Player"/>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton onClick={e => deleteDateHandler(index)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4}>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={4}>
                            <Button variant="contained" onClick={addNewPlayerTextField} fullWidth>Add Player</Button>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>*/}
                </Grid>
                <Grid justifyContent={"right"} alignItems="right"
                      alignContent={"right"} style={{textAlign: "center"}} item xs={12}>
                    <Button variant="contained" style={{maxWidth: 500}} onClick={addNewPlayerTextField}>Add
                        Player</Button>
                </Grid>
                <Grid item xs={12} style={{marginBottom: 20}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
