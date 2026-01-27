import type { Meta, StoryObj } from '@storybook/react-vite'

import { NumericInput } from '../components/NumericInput'

const meta = {
    tags: ['autodocs'],
    title: 'Example/NumericInput',
    component: NumericInput,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof NumericInput>

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
