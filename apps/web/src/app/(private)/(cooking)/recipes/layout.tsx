'use client'

import { Section } from '@ui/core/Section'

export default function Layout({ children }: DefaultProps): React.JSX.Element {
    return (
        <Section className='flex items-center justify-center'>
            {children}
        </Section>
    )
}
