import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '../../components/Typography'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Typography/H1',
    component: Typography.H1,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: { children: 'Heading 1' }
} satisfies Meta<typeof Typography.H1>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
