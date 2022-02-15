import React, {ChangeEvent, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Checkbox, TextField} from "@material-ui/core";

var randomstring = require("randomstring");


export const CalendarComponent = () => {

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

    return (
        <div>
            <Button variant="contained" onClick={handleAddUserDateClick}>Add</Button>
            <TableContainer sx={{minWidth: 650, maxWidth: 900}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            {dates.map(date =>
                                <TableCell>{date}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userDates.map((userDate) => (
                            <TableRow key={userDate.id}>
                                <TableCell sx={{minWidth: 300, maxWidth: 300}} scope="row">
                                    <TextField fullWidth variant="outlined"
                                               onChange={e => handleNameChange(userDate.id, e)} value={userDate.name}/>
                                </TableCell>
                                {
                                    dates.map(date => {
                                        return userDate.dates.filter(value => date === value.date).map(found =>
                                            <TableCell>
                                                <Checkbox checked={found.participation}
                                                          onChange={e => handleDateCheckboxChange(userDate.id, found.date, e)}/>
                                            </TableCell>)
                                    })
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
