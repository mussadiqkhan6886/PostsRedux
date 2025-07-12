import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'

const PostExcert = ({post}) => {
  return (
     <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0,100)}</p>
            <p>
              <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            </p>  
            <ReactionButton post={post} />
        </article>
  )
}

export default PostExcert
