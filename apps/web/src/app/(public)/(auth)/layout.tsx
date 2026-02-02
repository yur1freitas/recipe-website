import { Section } from '@ui/core/Section'

export default async function Layout({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    return (
        <Section className='flex items-center justify-center'>
            {children}
        </Section>
    )
}
