import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({ post }) => {
    return (
        <article className="border border-gray-600 mb-5 p-4">
            <h3 className="font-semibold text-white text-xl mb-2">{post.title.toUpperCase()}</h3>
            <p className="text-gray-400">{post.body.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}
export default PostsExcerpt