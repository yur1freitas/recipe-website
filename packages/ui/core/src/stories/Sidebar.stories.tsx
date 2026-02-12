import type { Meta, StoryObj } from '@storybook/react-vite'

import { Sidebar } from '~/components/Sidebar'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Sidebar',
    component: Sidebar.Root,
    render: (props) => (
        <Sidebar.Root {...props}>
            <div className='flex flex-row-reverse'>
                <div className='w-full'>
                    <Sidebar.Trigger>Abrir</Sidebar.Trigger>
                </div>
                <Sidebar.Panel>
                    <Sidebar.Content>
                        <Sidebar.Header>Header</Sidebar.Header>
                        <Sidebar.Group>
                            <Sidebar.GroupLabel>Group Label</Sidebar.GroupLabel>
                            <Sidebar.Link>Link A</Sidebar.Link>
                            <Sidebar.Link>Link B</Sidebar.Link>
                            <Sidebar.Link>Link C</Sidebar.Link>
                        </Sidebar.Group>
                        <Sidebar.Footer>Footer</Sidebar.Footer>
                    </Sidebar.Content>
                </Sidebar.Panel>
            </div>
        </Sidebar.Root>
    ),
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        open: {
            type: 'boolean',
            control: 'boolean'
        },
        openMobile: {
            type: 'boolean',
            control: 'boolean'
        }
    },
    args: {}
} satisfies Meta<typeof Sidebar.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Left: Story = {
    render: (props) => (
        <Sidebar.Root {...props}>
            <div className='flex flex-row-reverse'>
                <div className='w-full'>
                    <Sidebar.Trigger>Abrir</Sidebar.Trigger>
                </div>
                <Sidebar.Panel side='left'>
                    <Sidebar.Content>
                        <Sidebar.Header>Header</Sidebar.Header>
                        <Sidebar.Group>
                            <Sidebar.GroupLabel>Group Label</Sidebar.GroupLabel>
                            <Sidebar.Link>Link A</Sidebar.Link>
                            <Sidebar.Link>Link B</Sidebar.Link>
                            <Sidebar.Link>Link C</Sidebar.Link>
                        </Sidebar.Group>
                        <Sidebar.Footer>Footer</Sidebar.Footer>
                    </Sidebar.Content>
                </Sidebar.Panel>
            </div>
        </Sidebar.Root>
    )
}

export const Right: Story = {
    render: (props) => (
        <Sidebar.Root {...props}>
            <div className='flex'>
                <div className='w-full'>
                    <Sidebar.Trigger>Abrir</Sidebar.Trigger>
                </div>
                <Sidebar.Panel side='right'>
                    <Sidebar.Content>
                        <Sidebar.Header>Header</Sidebar.Header>
                        <Sidebar.Group>
                            <Sidebar.GroupLabel>Group Label</Sidebar.GroupLabel>
                            <Sidebar.Link>Link A</Sidebar.Link>
                            <Sidebar.Link>Link B</Sidebar.Link>
                            <Sidebar.Link>Link C</Sidebar.Link>
                        </Sidebar.Group>
                        <Sidebar.Footer>Footer</Sidebar.Footer>
                    </Sidebar.Content>
                </Sidebar.Panel>
            </div>
        </Sidebar.Root>
    )
}

export const Inset: Story = {
    parameters: { layout: 'centered' },
    render: (props) => (
        <Sidebar.Root {...props}>
            <div className='flex w-full border border-border rounded overflow-hidden'>
                <Sidebar.Panel side='left' height='16rem'>
                    <Sidebar.Content inset>
                        <Sidebar.Header>Header</Sidebar.Header>
                        <Sidebar.Group>
                            <Sidebar.GroupLabel>Group Label</Sidebar.GroupLabel>
                            <Sidebar.Link>Link A</Sidebar.Link>
                            <Sidebar.Link>Link B</Sidebar.Link>
                            <Sidebar.Link>Link C</Sidebar.Link>
                        </Sidebar.Group>
                        <Sidebar.Footer>Footer</Sidebar.Footer>
                    </Sidebar.Content>
                </Sidebar.Panel>
                <div className='flex-1 p-4'>
                    <Sidebar.Trigger>Abrir</Sidebar.Trigger>
                </div>
            </div>
        </Sidebar.Root>
    )
}
