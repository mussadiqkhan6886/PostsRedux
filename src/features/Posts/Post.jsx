import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllItems } from './postSlicer'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'

const Post = () => {
    const posts = useSelector(selectAllItems)
    
    const listedPost = posts.map((post) => (
        <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
              <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.time} />
            </p>  
            <ReactionButton post={post} />
        </article>
    ))

  return (
    <div>
      <h1>Posts</h1>
      <div className='flex flex-col-reverse'>
      {listedPost}

      </div>
    </div>
  )
}

export default Post
