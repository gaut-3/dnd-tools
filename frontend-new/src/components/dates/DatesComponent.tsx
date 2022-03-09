import React, {ChangeEvent, useState} from "react";
import {Grid, Stack, Typography} from "@mui/material";
import {DnDDate, DnDDates} from "../../models/DnDDate";
import {format, parse, parseISO, toDate} from 'date-fns'
import { frCH} from 'date-fns/esm/locale'

var randomstring = require("randomstring");


export const DatesComponent = () => {

    // https://medium.com/benextcompany/refactoring-react-class-components-to-typescript-functional-components-with-hooks-a4f42b2bd7b5
    const dates = ["21.06.2021", "22.06.2021", "23.06.2021", "24.06.2021", "25.06.2021", "26.06.2021", "27.06.2021"]
    const [userDates, setUserDates] = useState([
        {
            "id": "1",
            "name": "gautham",
            "dates":
                [
                    {"date": "21.06.2021", "participation": true},
                    {"date": "22.06.2021", "participation": false},
                    {"date": "23.06.2021", "participation": true},
                    {"date": "24.06.2021", "participation": false},
                ]
        },
        {
            "id": "2",
            "name": "test3",
            "dates":
                [
                    {"date": "21.06.2021", "participation": true},
                    {"date": "22.06.2021", "participation": true},
                    {"date": "23.06.2021", "participation": false},
                    {"date": "24.06.2021", "participation": false},
                ]
        },
        {
            "id": "3",
            "name": "test5",
            "dates":
                [
                    {"date": "21.06.2021", "participation": false},
                    {"date": "22.06.2021", "participation": true},
                    {"date": "23.06.2021", "participation": true},
                    {"date": "24.06.2021", "participation": false},
                    {"date": "28.06.2021", "participation": false},
                ]
        },
    ])


    const handleDateCheckboxChange = (userDateId: string, userDate: string, event: ChangeEvent<HTMLInputElement>) => {
        let temp = [...userDates];
        temp.forEach(value => {
            if (value.id === userDateId) {
                value.dates.forEach(value1 => {
                    if (value1.date === userDate) {
                        value1.participation = event.target.checked
                    }
                })
            }
        })

        setUserDates(temp);
    }

    const handleAddUserDateClick = () => {
        let temp = [...userDates];
        const newDates = dates.map(value => {
            return {"date": value, "participation": false}
        })

        console.log(newDates)
        temp.push({
            "id": randomstring.generate(4),
            "name": "",
            "dates": newDates
        })
        setUserDates(temp);
    }

    const handleNameChange = (userDateId: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let temp = [...userDates];
        temp.forEach(value => {
            if (value.id === userDateId) {
                value.name = event.target.value;
            }
        })

        setUserDates(temp);
        console.log(temp);
    }


    const example = '{"dates": [{ "date": "01.01.2022", "players": "Dario, Facundo, Frido, Kuch, Tiffany", "comment": "" },{ "date": "04.16.2022", "players": "Dario, Facundo, Frido, Kuch, Tiffany", "comment": "" }]}'
    const exampleJson: DnDDates = JSON.parse(example);
    console.log(exampleJson.dates)
    const dateFormatter = (date: string) : string => {
        var days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Dienstag', 'Freitag', 'Samstag'];
        let day = days[new Date(date).getDay()];
        return date + ", " + day
    }

    return (
        <>
            <Grid container columnSpacing={2} >
                {
                    exampleJson.dates.map((dnDDate, index) => (
                    <>
                        <Grid item xs={4}>
                            <Typography>
                                {dateFormatter(dnDDate.date)}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>
                                {dnDDate.comment}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:20}}>
                            <Typography>
                                {dnDDate.players}
                            </Typography>
                        </Grid>
                    </>
                ))}

            </Grid>
        </>
    );
}
