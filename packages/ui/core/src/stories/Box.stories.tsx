import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from '../components/Box'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Box',
    component: Box,
    parameters: {},
    argTypes: {
        variant: {
            type: 'string',
            control: 'select',
            options: ['default', 'popup']
        },
        size: {
            type: 'string',
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl']
        }
    },
    args: {
        children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    }
} satisfies Meta<typeof Box>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Popup: Story = {
    args: {
        variant: 'popup'
    }
}

export const ExtraSmall: Story = {
    args: {
        size: 'xs'
    }
}

export const Small: Story = {
    args: {
        size: 'sm'
    }
}

export const Medium: Story = {
    args: {
        size: 'md'
    }
}

export const Large: Story = {
    args: {
        size: 'lg'
    }
}

export const ExtraLarge: Story = {
    args: {
        size: 'xl'
    }
}
