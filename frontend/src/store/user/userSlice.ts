import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import from
import axios from "axios";

export interface User  {
    username: string,
    roles: string,
    password: string,
    email: string
}

export interface UserState {
    user: User;
}

export const userInitialState: UserState= {
    user: {
        username: "",
        roles: "",
        password: "",
        email: ""
    }
}

const userSlice = createSlice({
    name: "userSlice",
    initialState: userInitialState,
    reducers: {

    }
})



export const loginUser = (username: string, password: string) => {
    return (dispatch) => {
        apiInstance
    }
}

login(username, password) {
    return axios
        .post(API_URL + "signin", {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

logout() {
    localStorage.removeItem("user");
}

register(username, email, password, roles) {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
        roles
    });
}

getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
}