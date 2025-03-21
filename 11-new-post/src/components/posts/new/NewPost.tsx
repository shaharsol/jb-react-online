import './NewPost.css'

export default function NewPost() {
    return (
        <div className='NewPost'>
            <form>
                <input type="text" placeholder='Title your post...'/>
                <textarea placeholder='Your post body...'></textarea>
                <button>Add Post</button>
            </form>
        </div>
    )
}