import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from '../components/Textarea'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Placeholder'
    }
}
