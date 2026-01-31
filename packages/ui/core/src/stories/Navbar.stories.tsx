import type { Meta, StoryObj } from '@storybook/react-vite'

import { Navbar } from '~/components/Navbar'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Navbar',
    component: Navbar.Root,
    render: (props) => (
        <Navbar.Root {...props}>
            <Navbar.Brand>Logo</Navbar.Brand>
            <Navbar.Content>
                <Navbar.Group>
                    <Navbar.Item>
                        <Navbar.Link href='#' active>
                            Home
                        </Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Navbar.Link href='#'>Sobre</Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Navbar.Link href='#'>Contatos</Navbar.Link>
                    </Navbar.Item>
                </Navbar.Group>
            </Navbar.Content>
        </Navbar.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Navbar.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
