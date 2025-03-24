import PostComment from '../../../models/post-comment/PostComment'
import Comment from '../comment/Comment'
import NewComment from '../new-comment/NewComment'
import './Comments.css'

interface CommentsProps {
    comments: PostComment[],
    addComment(postId: string, comment: PostComment): void,
    postId: string
}
export default function Comments(props: CommentsProps) {

    const { comments, postId, addComment } = props
    return (
        <div className='Comments'>
            <NewComment 
                postId={postId}
                addComment={addComment}
            />
            {comments.map(comment => <Comment 
                                        key={comment.id}
                                        comment={comment}
                                    />)}
        </div>
    )
}