import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../user/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const usersOptions = users.map(user => (
        <option className="bg-gray-800" key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section className="bg-gray-700 p-2 pt-4 mb-4 text-center w-full">
            <h2 className="text-white text-2xl font-semibold">Add a New Post</h2>
            <form className="bg-gray-900 mt-3 p-3">
                <div>
                <label className="text-white mr-3" htmlFor="postTitle">Post Title:</label>
                <input
                    autoComplete="off"
                    className="border border-gray-500 outline-none w-full px-2"
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                </div>
                <div className="mt-4">
                <label className="text-white mr-4" htmlFor="postAuthor">Author:</label>
                <select className="border-gray-500 border" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value="">Choose Author</option>
                    {usersOptions}
                </select>
                </div>
                <div className="my-4">
                <label className="text-white " htmlFor="postContent">Content:</label>
                <textarea
                className="w-full border border-gray-500 outline-none px-3"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    rows={3}
                />
                </div>
                <button
                className="border border-gray-500 px-6 py-1 hover:bg-gray-500 not-disabled:cursor-pointer disabled:bg-gray-400 disabled:text-gray-800 disabled:opacity-40"
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm