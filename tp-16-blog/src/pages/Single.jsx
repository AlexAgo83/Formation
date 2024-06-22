import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFetch } from '../hooks/useFetch'
import { Spinner } from '../components/Spinner'
import { Alert } from '../components/Alert'
import { Card } from '../components/Card'

export function Single({ postId }) {
    const title = 'My blog'
    useDocumentTitle(title)

    const { data: post, error, loading } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    useDocumentTitle(post?.title)

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <Alert type='danger'>{error.toString()}</Alert>
    }

    return <>
        <h1 className='mb-3'>{post.title}</h1>
        <img
            className='img-fluid img-thumbnail my-3'
            src={`https://picsum.photos/seed/${post.id}/800/600`} />
        <p>{post.body}</p>
        <p>
            <a href={`#post:${post.id + 1}`}>Next post</a>
        </p>
    </>
}