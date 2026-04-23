'use server'

import { Section } from '@ui/core/Section'
import { Navbar } from '@ui/core/Navbar'

import { Logo } from '~/components/Logo'

export default async function Layout({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    return (
        <Section className='flex items-center justify-center py-24'>
            <Navbar.Root className='absolute top-0'>
                <Navbar.Brand className='mx-auto xs:mx-0'>
                    <Logo />
                </Navbar.Brand>
            </Navbar.Root>
            {children}
        </Section>
    )
}
