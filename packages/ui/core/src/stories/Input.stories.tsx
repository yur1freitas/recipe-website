import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../components/Input'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Input',
    component: Input,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        variant: {
            type: 'string',
            control: 'select',
            options: ['default', 'value-only']
        }
    },
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

export const ValueOnly: Story = {
    args: { variant: 'value-only', defaultValue: 'Hello World' }
}

export const ValueOnlyAndReadonly: Story = {
    args: { variant: 'value-only', readOnly: true, defaultValue: 'Hello World' }
}

export const ValueOnlyAndDisabled: Story = {
    args: { variant: 'value-only', disabled: true, defaultValue: 'Hello World' }
}
