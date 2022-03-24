import { configureStore } from '@reduxjs/toolkit'
import {turnorderReducer} from "./turnorder/turnorderSlice";
import {monsterReducer} from "./turnorder/monsterSlice";
import {userReducer} from "./userSlice";
import {dndDatesReducer} from "./dndDatesSlice";
// ...

export const store = configureStore({
    reducer: {
        turnOrder: turnorderReducer,
        monsters: monsterReducer,
        user: userReducer,
        dndDates: dndDatesReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch