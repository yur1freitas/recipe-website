import React from 'react'

export default function Layout({ children }: DefaultProps): React.JSX.Element {
    return (
        <section className='w-full min-h-screen relative flex items-center justify-center'>
            {children}
        </section>
    )
}
