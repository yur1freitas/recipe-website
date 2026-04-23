'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogInIcon, SearchIcon, UserIcon, XIcon } from 'lucide-react'
import { debounce } from '@utils/core/debounce'

import { Section } from '@ui/core/Section'
import { Search } from '@ui/core/Search'
import { Navbar } from '@ui/core/Navbar'
import { Icon } from '@ui/core/Icon'

import { Logo } from '~/components/Logo'

import { NoAuthenticated } from './NoAuthenticated'
import { Authenticated } from './Authenticated'

export function Home({ children }: DefaultProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const query = searchParams.get('q') ?? ''

    const handleValueChange = debounce({
        delay: 500,
        callback: (value: string) => {
            if (value.trim() === '') {
                router.push(pathname)
                return
            }

            const query = new URLSearchParams({ q: value }).toString()
            router.push(`${pathname}?${query}`)
        }
    })

    const handleClearValue = () => {
        router.push(pathname)
    }

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <Section className='w-full min-h-screen relative'>
            <Navbar.Root className='max-w-7xl w-full px-4 mx-auto z-50 h-24'>
                <Navbar.Brand>
                    <Logo />
                </Navbar.Brand>
                <Navbar.Content className='w-full'>
                    <Navbar.Group className='w-ful'>
                        <Navbar.Item className='w-full'>
                            <Search.Root
                                defaultValue={query}
                                onValueClear={handleClearValue}
                                onValueChange={handleValueChange}
                                onSubmit={handleSubmit}
                            >
                                <Search.Button>
                                    <Icon label='Iniciar Busca'>
                                        <SearchIcon />
                                    </Icon>
                                </Search.Button>
                                <Search.Input name='q' />
                                <Search.CancelButton>
                                    <Icon label='Limpar Pesquisa'>
                                        <XIcon />
                                    </Icon>
                                </Search.CancelButton>
                            </Search.Root>
                        </Navbar.Item>
                        <NoAuthenticated>
                            <Navbar.Item className='hidden sm:flex'>
                                <Link
                                    href='/register'
                                    className='btn btn-outline btn-sm'
                                >
                                    Cadastrar-se
                                </Link>
                            </Navbar.Item>
                            <Navbar.Item className='hidden sm:flex'>
                                <Link
                                    href='/login'
                                    className='btn btn-primary btn-sm'
                                >
                                    Login
                                </Link>
                            </Navbar.Item>
                            <Navbar.Item className='sm:hidden'>
                                <Link
                                    href='/login'
                                    className='btn btn-outline btn-icon'
                                >
                                    <Icon label='Cadastra-se'>
                                        <LogInIcon />
                                    </Icon>
                                </Link>
                            </Navbar.Item>
                        </NoAuthenticated>
                        <Authenticated>
                            <Navbar.Item>
                                <Link
                                    href='/account/profile'
                                    className='btn btn-outline btn-icon'
                                >
                                    <Icon label='Configuração da Conta'>
                                        <UserIcon />
                                    </Icon>
                                </Link>
                            </Navbar.Item>
                        </Authenticated>
                    </Navbar.Group>
                </Navbar.Content>
            </Navbar.Root>
            {children}
        </Section>
    )
}
