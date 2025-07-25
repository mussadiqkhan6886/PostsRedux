import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

 const reactionEmoji = {
        thumbsUp: '👍',
        wow: '😮',
        heart: '❤',
        rocket: '🚀',
        coffee: '☕',
    }

const ReactionButton = ({post}) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button className='cursor-pointer' key={name} type='button' onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name, }))}>
                {emoji} {post.reactions[name]}
            </button>
        )
    }  )
   
    return <div>{reactionButtons}</div>
  
}

export default ReactionButton
