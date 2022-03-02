import React from 'react';
import './App.css';
import {TurnOrderComponent} from "./components/turnorder/TurnOrderComponent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MenuHeader from "./page/MenuHeader";
import {Box} from "@mui/material";

function App() {
    return (
        <Router>
            <MenuHeader/>
            <Box display="flex">
                <Box sx={{width: {md: 920}}}  m="auto">
                    <Routes>
                        <Route path='/turnorder' element={<TurnOrderComponent/>}/>
                        <Route path='/' element={<TurnOrderComponent/>}/>
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}


export default App;
