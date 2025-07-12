import React from 'react'

import Post from './features/Posts/PostsList'
import AddPost from './features/Posts/AddPostForm'

const App = () => {
  return (
    <main className='bg-gray-900 max-w-[550px] text-gray-300 px-10'>
      <AddPost />
     <div>
      <Post />
      </div>
    </main>
  )
}

export default App
