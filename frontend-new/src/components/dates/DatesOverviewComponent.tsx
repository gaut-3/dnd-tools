import React, {useEffect} from "react";
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {addDnDDates, deleteOneDndDates} from "../../store/dndDatesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {DnDDates} from "../../models/DnDDate";
import {v4 as uuid} from 'uuid';
import AuthService from "../../services/AuthService";
import DnDDateService from "../../services/DnDDateService";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import {useNavigate} from 'react-router-dom'

export const DatesOverviewComponent = () => {

    const dndDates = useAppSelector((state) => state.dndDates)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        DnDDateService.getAllDnDDates(dispatch)
    }, [dispatch]);

    const deleteDatesHandler = (id: string | null) => {
        if (id) {
            dispatch(deleteOneDndDates(id))
        }
    }

    const editDatesHandler = (uuid: string) => {
        navigate("/dates/edit?id=" + uuid)
    }

    const viewDatesHandler = (uuid: string) => {
        navigate("/dates?id=" + uuid)
    }

    const handleAddDndDates = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        if (name != null) {
            const newDndDate: DnDDates = {
                dates: [],
                name: name.toString(),
                uuid: uuid().toString(),
                _id: null,
                userId: AuthService.getCurrentUserId()
            }
            DnDDateService.addDnDDates(AuthService.getCurrentUserToken(), newDndDate).then(data => {
                if (data) {
                    dispatch(addDnDDates(data))
                }
            })
        }
    };

    return (
        <Box sx={{paddingLeft: 2, paddingRight: 2}}>
            <Typography variant="h3">Dates Overview</Typography>
            <Box sx={{marginTop: 5, marginBottom: 5}} component="form" onSubmit={handleAddDndDates} noValidate>
                <Grid spacing={2} container alignItems="center">
                    <Grid item xs={5}>
                        <TextField label="Name" fullWidth name="name" id="name"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid rowSpacing={2} container alignItems="center"
                  justifyContent="center">
                <Grid item xs={5}>
                    <Typography>
                        Name
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography>
                        UUID
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    {
                        dndDates.dndDatesList.map((dnDDates, index) => (
                            <Grid key={dnDDates.uuid} rowSpacing={2} container alignItems="center"
                                  justifyContent="center">
                                <Grid item xs={5}>
                                    <Typography>
                                        {dnDDates.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography>
                                        {dnDDates.uuid}
                                    </Typography>
                                </Grid>
                                <Grid style={{textAlign: "right"}} item xs={2}>
                                    <IconButton onClick={e => editDatesHandler(dnDDates.uuid)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={e => viewDatesHandler(dnDDates.uuid)}>
                                        <PageviewIcon/>
                                    </IconButton>
                                    <IconButton onClick={e => deleteDatesHandler(dnDDates._id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Box>
    );
}
