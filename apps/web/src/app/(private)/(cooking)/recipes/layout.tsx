'use server'

import { Section } from '@ui/core/Section'

import { Private } from '~/components/Private'

export default async function Layout({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    return (
        <Private>
            <Section className='flex items-center justify-center'>
                {children}
            </Section>
        </Private>
    )
}
