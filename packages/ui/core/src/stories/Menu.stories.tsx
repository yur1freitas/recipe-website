import type { Meta, StoryObj } from '@storybook/react-vite'

import { Menu } from '../components/Menu'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Menu',
    component: Menu.Root,
    render: (props) => (
        <Menu.Root {...props}>
            <Menu.Trigger>Menu</Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner>
                    <Menu.Popup>
                        <Menu.Arrow />
                        <Menu.Item>Opção A</Menu.Item>
                        <Menu.Item>Opção B</Menu.Item>
                        <Menu.Separator />
                        <Menu.Item>Opção C</Menu.Item>
                        <Menu.Item>Opção D</Menu.Item>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Menu.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
