import type { Meta, StoryObj } from '@storybook/react-vite'

import { SearchIcon, XIcon } from 'lucide-react'

import { Search } from '~/components/Search'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Search',
    component: Search.Root,
    render: (props) => (
        <Search.Root {...props}>
            <Search.Button>
                <SearchIcon />
            </Search.Button>
            <Search.Input />
            <Search.CancelButton>
                <XIcon />
            </Search.CancelButton>
        </Search.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        variant: {
            type: 'string',
            control: 'select',
            options: ['default', 'reversed']
        }
    },
    args: {}
} satisfies Meta<typeof Search.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Reversed: Story = {
    render: () => (
        <Search.Root variant='reversed'>
            <Search.Input />
            <Search.Button>
                <SearchIcon />
            </Search.Button>
            <Search.CancelButton>
                <XIcon />
            </Search.CancelButton>
        </Search.Root>
    )
}
