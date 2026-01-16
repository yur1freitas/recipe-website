import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loading } from '../components/Loading'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Loading',
    component: Loading,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        label: {
            type: 'string',
            control: 'text'
        },
        labelPos: {
            type: 'string',
            control: 'select',
            options: ['top', 'bottom', 'left', 'right']
        }
    },
    args: {}
} satisfies Meta<typeof Loading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
    args: {
        label: 'Carregando...'
    }
}

export const WithLabelInTop: Story = {
    args: {
        label: 'Carregando...',
        labelPos: 'top'
    }
}

export const WithLabelInBottom: Story = {
    args: {
        label: 'Carregando...',
        labelPos: 'bottom'
    }
}

export const WithLabelInLeft: Story = {
    args: {
        label: 'Carregando...',
        labelPos: 'left'
    }
}

export const WithLabelInRight: Story = {
    args: {
        label: 'Carregando...',
        labelPos: 'right'
    }
}
