import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFetch } from '../hooks/useFetch'
import { Spinner } from '../components/Spinner'
import { Alert } from '../components/Alert'
import { Card } from '../components/Card'

export function Home() {
    const title = 'My blog'
    useDocumentTitle(title)

    const { data, error, loading } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

    return <>
        <h1 className='mb-3'>{title}</h1>
        {loading && <Spinner />}
        {error && <Alert type='danger'>{error.toString()}</Alert>}
        {data && <div className="row gap-4">{data.map((post) => (
            <div key={post.id} className='col-12 col-md-4'>
                <Card
                    title={post.title}
                    description={post.body}
                    href={`#post:${post.id}`}
                    buttonLabel={'Read more'}
                    image={`https://picsum.photos/seed/${post.id}/280/180`}
                />
            </div>
        ))}</div>}
    </>
}