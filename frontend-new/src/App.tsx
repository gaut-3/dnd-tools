import React from 'react';
import './App.css';
import {TurnOrderComponent} from "./components/turnorder/TurnOrderComponent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MenuHeader from "./page/MenuHeader";

function App() {
    return (
        <Router>
            <MenuHeader/>
            <Routes>
                <Route path='/turnorder' element={<TurnOrderComponent/>}/>
                <Route path='/' element={<TurnOrderComponent/>}/>
            </Routes>
        </Router>
    );
}


export default App;
