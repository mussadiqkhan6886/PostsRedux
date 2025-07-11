import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from "date-fns"

const initialState = [
        {id: 1, title: "Post 1", content: "this is practice react redux toolkit project", time: sub(new Date(), {minutes: 10}).toISOString(), reactions: {
            thumb: 0, wow: 0, heart: 0, rocket: 0, coffee: 0
        }},
        {id: 2, title: "Post 2", content: "This is post 2 for redux practice", time: sub(new Date(), {minutes: 5}).toISOString(), reactions: {
            thumb: 0, wow: 0, heart: 0, rocket: 0, coffee: 0
        }}
    ]

const postSlicer = createSlice({
    name: "post",
    initialState,
    reducers:{
        addPost: {
            reducer(state,action){
                state.push(action.payload)
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
                const existingPost = state.find(post => post.id == postId)
                if(existingPost){
                    existingPost.reactions[reaction]++
                }
            }
    }
})

export const selectAllItems = state => state.post

export const {addPost, reactionAdded} = postSlicer.actions

export default postSlicer.reducer