import React, {useEffect, useState} from "react"
import {Box, Divider, Grid, Typography} from "@mui/material"
import {DnDDate, DnDDates} from "../../models/DnDDate"
import axios from "axios"
import {useSearchParams} from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {AddDateComponent} from "./AddDateComponent"
import {format} from "date-fns";

interface Props {
    editMode: boolean
}

export const DatesComponent = ({editMode}: Props) => {

    const init = {
        _id: "",
        name: "",
        uuid: "",
        dates: [],
        userId: null
    }
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Dienstag', 'Freitag', 'Samstag']
    const [searchParams] = useSearchParams()
    const [dndDates, setDndDates] = useState<DnDDates>(init)

    //3b241101-e2bb-4255-8caf-4136c566a962
    useEffect(() => {
        // Use [] as second argument in useEffect for not rendering each time
        axios.get('/api/dnddates/' + searchParams.get("id"))
            .then((response: any) => {
                if (response.data != null && response.data.data) {
                    setDndDates(response.data.data)
                }
            })

        console.log(dndDates)
    }, [])


    const dateFormatter = (dateString: string): string => {
        if (dateString) {
            const date = new Date(dateString)
            let day = days[date.getDay()]
            const dateFormatted = format(date, 'dd.MM.yyyy')
            return dateFormatted + ", " + day
        }
        return ""
    }

    const addNewDndDate = (newDndDate: DnDDate) => {
        let tempDndDates = dndDates
        tempDndDates.dates.push(newDndDate)
        let newDndDates: DnDDates = {
            dates: tempDndDates.dates,
            _id: dndDates._id,
            uuid: dndDates.uuid,
            name: dndDates.name,
            userId: dndDates.userId
        }
        updateDnDDates(newDndDates)
    }

    const deleteDateHandler = (date: string) => {
        let updatedDates = dndDates.dates.filter(value => value.date !== date)
        let tempDnDDates: DnDDates = {
            dates: updatedDates,
            _id: dndDates._id,
            uuid: dndDates.uuid,
            name: dndDates.name,
            userId: dndDates.userId
        }
        console.log("temp", tempDnDDates)
        updateDnDDates(tempDnDDates)
    }

    const updateDnDDates = (dndDates: DnDDates) => {
        let item = localStorage.getItem('user')
        if (item !== null) {
            let user = JSON.parse(item)
            console.log(user)
            const token = user.accessToken
            axios.put('/api/dnddates/' + searchParams.get("id"), {dndDates}, {
                headers: {"x-access-token": `${token}`},
            })
        }
        setDndDates(dndDates)
    }

    return (
        <>
            {editMode && <AddDateComponent dndDates={dndDates} addNewDate={addNewDndDate}/>}
            <Box>
                {
                dndDates.dates.map((dnDDate, index) => (
                    <Grid sx={{paddingLeft: 2, paddingRight: 2}} key={dnDDate.date} container direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <Grid item xs={3}>
                            <Typography style={{fontWeight: 600, fontSize: "large"}}>
                                {dateFormatter(dnDDate.date)}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>
                                {dnDDate.comment}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={e => deleteDateHandler(dnDDate.date)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                        <Grid style={{marginBottom: 10}} item xs={12}>
                            <Typography style={{fontWeight: 600}}>Teilnehmer</Typography>
                        </Grid>
                        {dnDDate.players.map((player, index) => (
                            <Grid key={player + index} item style={{marginBottom: 10}} xs={12}>
                                <Typography>
                                    {player}
                                </Typography>
                            </Grid>
                        ))}
                        <Grid item xs={12} style={{marginBottom: 20, marginTop: 10}}>
                            <Divider/>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </>
    )
}
