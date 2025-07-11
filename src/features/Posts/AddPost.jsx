import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from './postSlicer'
import { selectAll } from '../user/userSlicer'

const AddPost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const dispatch = useDispatch()
    const users = useSelector(selectAll)

    const userOptions = () => {
        return users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
        ))        
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const handleAddingPost = (e) => {
        e.preventDefault()
        if(title && content){
            dispatch(addPost(title, content, userId))
        }
        setTitle('')
        setContent('')
        setUserId('')
    }

  return (
    <div>
      <form>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        <label htmlFor="author">Author: </label>
        <select name="author" id="author" value={userId} onChange={e => setUserId(e.target.value)}>
            <option value=""></option>
            {userOptions()}
        </select>
        <label htmlFor="content">Content: </label>
        <input type="text" id='content' name='content' value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={handleAddingPost} disabled={!canSave}>Save Post</button>
      </form>
    </div>
  )
}

export default AddPost
