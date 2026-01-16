import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '../../components/Typography'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Typography/List',
    component: Typography.List,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        type: {
            type: 'string',
            control: 'select',
            options: ['disc', 'decimal']
        }
    },
    args: {
        children: (
            <>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </>
        )
    }
} satisfies Meta<typeof Typography.List>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disc: Story = {
    args: {
        type: 'disc'
    }
}

export const Decimal: Story = {
    args: {
        type: 'decimal'
    }
}
