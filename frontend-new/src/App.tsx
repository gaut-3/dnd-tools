import React from 'react';
import './App.css';
import {TurnOrderComponent} from "./components/turnorder/TurnOrderComponent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MenuHeader from "./page/MenuHeader";
import {Box, Stack} from "@mui/material";
import {DatesComponent} from "./components/dates/DatesComponent";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";

function App() {
    return (
        <Router>
            <Stack spacing={2}>
                <MenuHeader/>
                <Box display="flex">
                    <Box sx={{backgroundColor:"#fff9f1", paddingTop: 2, border: 2, width: {md: 920}}} m="auto">
                        <Routes>
                            <Route path='/turnorder' element={<TurnOrderComponent/>}/>
                            <Route path='/' element={<TurnOrderComponent/>}/>
                            <Route path='/dates' element={<DatesComponent editMode={false}/>}/>
                            <Route path='/dates/edit' element={<DatesComponent editMode={true}/>}/>
                            <Route path='/signin' element={<SignIn/>}/>
                            <Route path='/signup' element={<SignUp/>}/>
                        </Routes>
                    </Box>
                </Box>
            </Stack>
        </Router>
    );
}


export default App;
