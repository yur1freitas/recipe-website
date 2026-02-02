'use server'

import { Public } from '~/components/Public'

export default async function Layout({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    return <Public>{children}</Public>
}
