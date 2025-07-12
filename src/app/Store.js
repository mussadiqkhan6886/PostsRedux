import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/Posts/postSlicer"
import userReducer from "../features/user/userSlicer"

export const store = configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer
    },
})
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()