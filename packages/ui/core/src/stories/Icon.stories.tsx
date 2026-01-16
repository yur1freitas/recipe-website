import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserIcon } from 'lucide-react'

import { Icon } from '../components/Icon'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Icon',
    component: Icon,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        label: {
            type: 'string',
            control: 'text'
        }
    },
    args: {
        children: <UserIcon />
    }
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
    args: {
        label: 'Opções de Conta'
    }
}
