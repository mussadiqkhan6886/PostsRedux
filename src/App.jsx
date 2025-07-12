import React from 'react'

import Post from './features/Posts/PostsList'
import AddPost from './features/Posts/AddPostForm'

const App = () => {
  return (
    <main>
      <AddPost />
      <div>
      <Post />

      </div>
    </main>
  )
}

export default App
