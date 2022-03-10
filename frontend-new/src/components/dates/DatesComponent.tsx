import React, {useEffect, useState} from "react";
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import {DnDDate, DnDDates} from "../../models/DnDDate";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

var randomstring = require("randomstring");

interface Props {
    editMode: boolean;
}

export const DatesComponent = ({editMode}: Props) => {

    const init = {
        _id: "",
        uuid: "",
        dates: [],
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const [dndDates, setDndDates] = useState<DnDDates>(init);

    //3b241101-e2bb-4255-8caf-4136c566a962
    useEffect(() => {
        // Use [] as second argument in useEffect for not rendering each time
        axios.get('/api/dnddates/' + searchParams.get("id"))
            .then((response: any) => {
                if (response.data != null && response.data.data) {
                    setDndDates(response.data.data);
                }
            });
    }, []);

    const example = '{"dates": [{ "date": "01.01.2022", "players": "Dario, Facundo, Frido, Kuch, Tiffany", "comment": "" },{ "date": "04.16.2022", "players": "Dario, Facundo, Frido, Kuch, Tiffany", "comment": "" }]}'
    const exampleJson: DnDDates = JSON.parse(example);

    const dateFormatter = (date: string): string => {
        const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Dienstag', 'Freitag', 'Samstag'];
        let day = days[new Date(date).getDay()];
        return date + ", " + day
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const dndDate = data.get('dndDate');
        const players = data.get('players');
        const comment = data.get('comment');
        if (dndDate != null && players != null && comment != null) {
            const commentString = comment.toString()
            const dndDateString = dndDate.toString()
            const playersString = sortPlayers(players.toString())
            const checkIfExists = dndDates.dates.find(item => item.date === dndDateString);
            if (!checkIfExists) {
                const newDndDate: DnDDate = {
                    "date": dndDateString,
                    "players": playersString,
                    "comment": commentString,
                }
                let tempDndDates = dndDates;
                tempDndDates.dates.push(newDndDate)
                let newDndDates = {
                    dates: tempDndDates.dates,
                    _id: dndDates._id,
                    uuid: dndDates.uuid,
                };
                updateDnDDates(newDndDates)
            }
        }
    };

    const sortPlayers = (players: string): string => {
        let playerArray = players.split(",");
        let results = playerArray.map(element => {
            return element.trim();
        }).sort((a, b) =>
            a.localeCompare(b)
        )

        return results.join(",")
    }

    const addDate = () => {
        return (
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid sx={{paddingLeft: 2, paddingRight: 2}} spacing={2} container>
                    <Grid item xs={3}>
                        <TextField fullWidth label="Datum" name="dndDate" id="dndDate"/>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth label="Players" name="players" id="players"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Comment" name="comment" id="comment"/>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: 20}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    const deleteDateHandler = (date: string) => {
        let updatedDates = dndDates.dates.filter(value => value.date != date);
        let tempDnDDates = {
            dates: updatedDates,
            _id: dndDates._id,
            uuid: dndDates.uuid,
        };
        console.log("temp", tempDnDDates)
        updateDnDDates(tempDnDDates)
    }
    const updateDnDDates = (dndDates: DnDDates) => {
        let item = localStorage.getItem('user');
        if (item != null) {
            let user = JSON.parse(item);
            console.log(user)
            const token = user.accessToken;
            axios.put('/api/dnddates/' + searchParams.get("id"), {dndDates}, {
                headers: {"x-access-token": `${token}`},
            });
        }
        setDndDates(dndDates)
    }


    return (
        <>
            {editMode && addDate()}
            <Grid sx={{paddingLeft: 2, paddingRight: 2}} container>
                {
                    dndDates.dates.map((dnDDate, index) => (
                        <>
                            <Grid item xs={3}>
                                <Typography>
                                    {dateFormatter(dnDDate.date)}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>
                                    {dnDDate.players}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={e => deleteDateHandler(dnDDate.date)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: 20}}>
                                <Typography>
                                    {dnDDate.comment}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: 20}}>
                                <Divider/>
                            </Grid>

                        </>
                    ))}

            </Grid>
        </>
    );
}
