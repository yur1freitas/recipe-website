import { NoAuthenticated } from '~/components/NoAuthenticated'
import { Authenticated } from '~/components/Authenticated'

export default function Page() {
    return (
        <div>
            <Authenticated>
                <h1>Hello World</h1>
            </Authenticated>
            <NoAuthenticated>
                <h1>Hello World 2</h1>
            </NoAuthenticated>
        </div>
    )
}
