'use server'

import { Account } from '~/components/Account'

export default async function Layout({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    return <Account.Root>{children}</Account.Root>
}
