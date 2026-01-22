import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from '~/components/Progress'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Progress',
    component: Progress.Root,
    render: (props) => (
        <Progress.Root {...props}>
            <Progress.Label>Progresso</Progress.Label>
            <Progress.Value />
            <Progress.Track>
                <Progress.Indicator />
            </Progress.Track>
        </Progress.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        value: {
            type: 'number',
            control: 'number'
        }
    },
    args: {
        value: 10
    }
} satisfies Meta<typeof Progress.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
