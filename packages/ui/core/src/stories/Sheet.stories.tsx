import type { Meta, StoryObj } from '@storybook/react-vite'

import { Sheet } from '~/components/Sheet'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Sheet',
    component: Sheet.Root,
    render: (props) => (
        <Sheet.Root {...props}>
            <Sheet.Trigger>Abrir</Sheet.Trigger>
            <Sheet.Content>
                <Sheet.Header>
                    <Sheet.Title>Você tem certeza?</Sheet.Title>
                    <Sheet.Description>
                        Essa ação não pode ser revertida
                    </Sheet.Description>
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Sheet.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Left: Story = {
    render: (props) => (
        <Sheet.Root {...props}>
            <Sheet.Trigger>Abrir</Sheet.Trigger>
            <Sheet.Content side='left'>
                <Sheet.Header>
                    <Sheet.Title>Você tem certeza?</Sheet.Title>
                    <Sheet.Description>
                        Essa ação não pode ser revertida
                    </Sheet.Description>
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    )
}

export const Right: Story = {
    render: (props) => (
        <Sheet.Root {...props}>
            <Sheet.Trigger>Abrir</Sheet.Trigger>
            <Sheet.Content side='right'>
                <Sheet.Header>
                    <Sheet.Title>Você tem certeza?</Sheet.Title>
                    <Sheet.Description>
                        Essa ação não pode ser revertida
                    </Sheet.Description>
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    )
}

export const Bottom: Story = {
    render: (props) => (
        <Sheet.Root {...props}>
            <Sheet.Trigger>Abrir</Sheet.Trigger>
            <Sheet.Content side='bottom'>
                <Sheet.Header>
                    <Sheet.Title>Você tem certeza?</Sheet.Title>
                    <Sheet.Description>
                        Essa ação não pode ser revertida
                    </Sheet.Description>
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    )
}

export const Top: Story = {
    render: (props) => (
        <Sheet.Root {...props}>
            <Sheet.Trigger>Abrir</Sheet.Trigger>
            <Sheet.Content side='top'>
                <Sheet.Header>
                    <Sheet.Title>Você tem certeza?</Sheet.Title>
                    <Sheet.Description>
                        Essa ação não pode ser revertida
                    </Sheet.Description>
                </Sheet.Header>
            </Sheet.Content>
        </Sheet.Root>
    )
}
