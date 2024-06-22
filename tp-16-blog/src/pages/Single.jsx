import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFetch } from '../hooks/useFetch'
import { Spinner } from '../components/Spinner'
import { Alert } from '../components/Alert'
import { Button } from '../components/Button'
import { useToggle } from '../hooks/useToggle'
import { Modal } from '../components/Modal'
import { EditPostModal } from './SingleEditPostMdal'

export function Single({ postId }) {

    const { data: post, error, loading, setData } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    useDocumentTitle(post?.title)
    const [isEditing, toggleEdition] = useToggle(false)

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <Alert type='danger'>{error.toString()}</Alert>
    }

    const handleSave = (data) => {
        console.log(data)
    }

    return <>
        <h1 className='mb-3'>{post.title}</h1>
        <img
            className='img-fluid img-thumbnail my-3'
            src={`https://picsum.photos/seed/${post.id}/800/600`} />
        <p>{post.body}</p>
        {isEditing && <EditPostModal 
            post={post}
            onClose={toggleEdition}
            onSave={handleSave}/>}
        <Button
            variant='secondary'
            onClick={toggleEdition}>
            Edit
        </Button>
        <p>
            <a href={`#post:${post.id + 1}`}>Next post</a>
        </p>
    </>
}