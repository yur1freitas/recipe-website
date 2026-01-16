import type { Meta, StoryObj } from '@storybook/react-vite'

import { Password } from '../components/Password'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Password',
    component: Password.Root,
    render: (props) => (
        <Password.Root {...props}>
            <Password.Input value='1@#a&3L' placeholder='Sua senha' />
            <Password.ToggleButton>
                <Password.ToggleButtonIcon />
            </Password.ToggleButton>
        </Password.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        visible: {
            type: 'boolean',
            control: 'boolean'
        }
    },
    args: {}
} satisfies Meta<typeof Password.Root>

export default meta

type Story = StoryObj<typeof meta>

export const WithPasswordHidden: Story = {
    args: {
        visible: false
    }
}

export const WithPasswordVisible: Story = {
    args: {
        visible: true
    }
}

export const WithInvalidState: Story = {
    render: (props) => (
        <Password.Root {...props}>
            <Password.Input aria-invalid={true} />
            <Password.ToggleButton>
                <Password.ToggleButtonIcon />
            </Password.ToggleButton>
        </Password.Root>
    )
}
