import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '../../components/Typography'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Typography/H2',
    component: Typography.H2,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: { children: 'Heading 2' }
} satisfies Meta<typeof Typography.H2>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
