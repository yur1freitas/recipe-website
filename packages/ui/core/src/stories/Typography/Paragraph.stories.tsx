import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '../../components/Typography'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Typography/Paragraph',
    component: Typography.Paragraph,
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {
        children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
    }
} satisfies Meta<typeof Typography.Paragraph>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
