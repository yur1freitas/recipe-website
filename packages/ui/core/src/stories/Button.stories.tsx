import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserIcon } from 'lucide-react'

import { Button } from '../components/Button'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        variant: {
            type: 'string',
            control: 'select',
            options: [
                'primary',
                'secondary',
                'outline',
                'success',
                'destructive'
            ]
        },
        size: {
            type: 'string',
            control: 'select',
            options: ['sm', 'md', 'lg', 'icon']
        }
    },
    args: {
        children: 'Button'
    }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Primary: Story = {
    args: {
        variant: 'primary'
    }
}

export const Secondary: Story = {
    args: {
        variant: 'secondary'
    }
}

export const Outline: Story = {
    args: {
        variant: 'outline'
    }
}

export const Success: Story = {
    args: {
        variant: 'success'
    }
}

export const Destructive: Story = {
    args: {
        variant: 'destructive'
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

export const Icon: Story = {
    args: {
        size: 'icon',
        children: <UserIcon />
    }
}

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <UserIcon />
                Conta
            </>
        )
    }
}
