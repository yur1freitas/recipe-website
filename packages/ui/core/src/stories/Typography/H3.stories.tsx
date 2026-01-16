import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '../../components/Typography'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Typography/H3',
    component: Typography.H3,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: { children: 'Heading 3' }
} satisfies Meta<typeof Typography.H3>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
