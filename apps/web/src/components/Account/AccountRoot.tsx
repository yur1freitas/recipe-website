'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    LockKeyholeIcon,
    PanelRightCloseIcon,
    ShieldAlertIcon,
    UserIcon
} from 'lucide-react'

import { Sidebar } from '@ui/core/Sidebar'
import { Section } from '@ui/core/Section'
import { Navbar } from '@ui/core/Navbar'
import { Icon } from '@ui/core/Icon'
import { Box } from '@ui/core/Box'

import { Logo } from '../Logo'

export interface AccountRootProps {
    children?: React.ReactNode
}

export function AccountRoot({ children }: AccountRootProps): React.JSX.Element {
    const pathname = usePathname()

    return (
        <Section className='flex justify-center items-center py-24'>
            <Sidebar.Root open>
                <Navbar.Root className='fixed top-0 left-0'>
                    <Sidebar.Trigger
                        size='icon'
                        variant='ghost'
                        className='md:hidden'
                    >
                        <Icon label='Abrir/Fechar Barra Lateral'>
                            <PanelRightCloseIcon />
                        </Icon>
                    </Sidebar.Trigger>
                    <Navbar.Brand className='mx-auto md:mx-0'>
                        <Logo />
                    </Navbar.Brand>
                </Navbar.Root>
                <Box className='px-2 py-0'>
                    <div className='md:grid md:grid-cols-[min-content_auto]'>
                        <Sidebar.Panel side='left' height='24rem'>
                            <Sidebar.Content inset>
                                <Sidebar.Header>
                                    <h2 className='text-lg font-semibold'>
                                        Conta
                                    </h2>
                                </Sidebar.Header>
                                <Sidebar.Group>
                                    <Sidebar.GroupLabel>
                                        Opções
                                    </Sidebar.GroupLabel>
                                    <Link
                                        href='/account/profile'
                                        className='sidebar-link'
                                        data-active={
                                            pathname === '/account/profile'
                                        }
                                    >
                                        <Icon>
                                            <UserIcon />
                                        </Icon>
                                        Perfil
                                    </Link>
                                    <Link
                                        href='/account/security'
                                        className='sidebar-link'
                                        data-active={
                                            pathname === '/account/security'
                                        }
                                    >
                                        <Icon>
                                            <LockKeyholeIcon />
                                        </Icon>
                                        Segurança
                                    </Link>
                                    <Link
                                        href='/account/delete'
                                        className='sidebar-link'
                                        data-active={
                                            pathname === '/account/delete'
                                        }
                                    >
                                        <Icon>
                                            <ShieldAlertIcon />
                                        </Icon>
                                        Exclusão
                                    </Link>
                                </Sidebar.Group>
                            </Sidebar.Content>
                        </Sidebar.Panel>
                        {children}
                    </div>
                </Box>
            </Sidebar.Root>
        </Section>
    )
}
