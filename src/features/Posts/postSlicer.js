import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from "date-fns"

const initialState = {
    posts: [],
    status: "idle",
    error: null
}

const postSlicer = createSlice({
    name: "post",
    initialState,
    reducers:{
        addPost: {
            reducer(state,action){
                state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                    return {
                        payload: {
                            id: nanoid(),
                            title,
                            content,
                            time: new Date().toISOString(),
                            userId,
                            reactions: {
                                thumb: 0, wow: 0, heart: 0, rocket: 0, coffee: 0
                            }
                        }
                    }
                }
           
            },
             reactionAdded(state, action){
                const {postId, reaction} = action.payload
                const existingPost = state.posts.find(post => post.id == postId)
                if(existingPost){
                    existingPost.reactions[reaction]++
                }
            }
    }
})

export const selectAllItems = state => state.posts.post

export const {addPost, reactionAdded} = postSlicer.actions

export default postSlicer.reducer