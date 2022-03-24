import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {User} from "../models/User";
import AuthService from "../services/AuthService";


interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, {payload: user}: PayloadAction<User>) => {
            let success = false;
            AuthService.login(user.email, user.password).then(() => {
                success = true
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage)
            })
            if (success) {
                state.user = user
            }
        },
        logout: (state) => {
            AuthService.logout()
            state.user = null
        },
        register: (state, {payload: user}: PayloadAction<User>) => {
            AuthService.register(
                user.email,
                user.password
            ).then(
                response => {
                    console.log(response.data.message)
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage)
                }
            );
        }

    },
})

export const {
    register, login, logout
} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export const userReducer = userSlice.reducer