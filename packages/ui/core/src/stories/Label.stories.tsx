import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../components/Label'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Label',
    component: Label,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {
        children: 'Label'
    }
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInvalidState: Story = {
    args: {
        'aria-invalid': 'true'
    }
}
