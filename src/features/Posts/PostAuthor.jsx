import React from 'react'
import { useSelector } from 'react-redux'
import { selectAll } from '../user/userSlicer'

const PostAuthor = ({userId}) => {
    const user = useSelector(selectAll)
    const author = user.find(u => u.id == userId)
  return (
    <span>
        by {author ? author.name : "Unknown author"}
    </span>
  )
}

export default PostAuthor
