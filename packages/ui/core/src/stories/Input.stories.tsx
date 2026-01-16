import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../components/Input'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Input',
    component: Input,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Placeholder'
    }
}

export const WithInvalidState: Story = {
    args: {
        'aria-invalid': 'true'
    }
}
