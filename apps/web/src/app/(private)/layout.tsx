'use server'

import { Private } from '~/components/Private'

export default async function Layout({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    return <Private>{children}</Private>
}
