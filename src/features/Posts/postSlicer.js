import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: "idle",
    error: null
}

export const fetchedData = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
})
export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
    const response = await axios.get(POSTS_URL, newPost)
    return response.data;
})

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
                            date: new Date().toISOString(),
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
    },
        extraReducers(builder){
                builder
                    .addCase(fetchedData.pending, (state, action) => {
                        state.status = 'loading'
                    })
                    .addCase(fetchedData.fulfilled, (state, action) => {
                        state.status = "succeed"
                        let min = 1;
                        const loadedPosts = action.payload.map(post  => {
                            post.date = sub(new Date(), {minutes: min++}).toISOString(),
                            post.reactions = {
                                thumb: 0,
                                wow: 0,
                                heart: 0,
                                rocket: 0,
                                coffee: 0
                            }
                            return post
                        })
                        state.posts = state.posts.concat(loadedPosts)
                    })
                    .addCase(fetchedData.rejected, (state, action) => {
                        state.status = "failed"
                        state.error = action.error.message
                    })
                    .addCase(addNewPost.fulfilled, (state, action) => {

                         const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

                        action.payload.userId = Number(action.payload.userId)
                        action.payload.date = new Date().toISOString()
                        action.payload.reactions = {
                            thumb:0, wow:0, heart:0, rocket:0, coffee:0
                        }
                        console.log(action.payload)
                        state.posts.push(action.payload)
                    })
        }
})

export const selectAllItems = state => state.posts.posts
export const selectAllStatus = state => state.posts.status
export const selectAllError = state => state.posts.error

export const {addPost, reactionAdded} = postSlicer.actions

export default postSlicer.reducer