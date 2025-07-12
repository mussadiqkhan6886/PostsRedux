import { useDispatch, useSelector } from 'react-redux'
import { selectAllItems, selectAllError, selectAllStatus, fetchedData } from './postSlicer'
import { useEffect } from 'react'

import PostExcert from './PostExcert'

const Post = () => {
    const posts = useSelector(selectAllItems)
    const postsError = useSelector(selectAllError)
    const postsStatus = useSelector(selectAllStatus)

    const dispatch = useDispatch()

    useEffect(() => {
      if(postsStatus == "idle"){
        dispatch(fetchedData())
      }
    }, [postsStatus, dispatch])
    
    let content;
   if(postsStatus == "loading"){
    content = <p>Loading...</p>
   }else if(postsStatus == "succeed"){
    content = posts.map(post => <PostExcert  post={post} />)
   }else if(postsStatus == "failed"){
    content = <p>{postsError}</p>
   }

  return (
    <div>
      <h1>Posts</h1>
      <div className='flex flex-col-reverse'>
      {content}
      </div>
    </div>
  )
}

export default Post
