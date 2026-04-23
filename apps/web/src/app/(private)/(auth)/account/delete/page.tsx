'use server'

import { Account } from '~/components/Account'

export default async function Page(): Promise<React.JSX.Element> {
    return <Account.Delete />
}
