import type { Meta, StoryObj } from '@storybook/react-vite'

import { TimeField } from '../components/TimeField'

const meta = {
    tags: ['autodocs'],
    title: 'Example/TimeField',
    component: TimeField.Root,
    subcomponents: {
        Label: TimeField.Label,
        Group: TimeField.Group,
        Input: TimeField.Label
    },
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof TimeField.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Millisecond: Story = {
    render: (props) => (
        <TimeField.Root {...props}>
            <TimeField.Label>TimeField</TimeField.Label>
            <TimeField.Group>
                <TimeField.Input type='ms' />
            </TimeField.Group>
        </TimeField.Root>
    )
}

export const Second: Story = {
    render: (props) => (
        <TimeField.Root {...props}>
            <TimeField.Label>TimeField</TimeField.Label>
            <TimeField.Group>
                <TimeField.Input type='second' />
            </TimeField.Group>
        </TimeField.Root>
    )
}

export const Minute: Story = {
    render: (props) => (
        <TimeField.Root {...props}>
            <TimeField.Label>TimeField</TimeField.Label>
            <TimeField.Group>
                <TimeField.Input type='minute' />
            </TimeField.Group>
        </TimeField.Root>
    )
}

export const Hour: Story = {
    render: (props) => (
        <TimeField.Root {...props}>
            <TimeField.Label>TimeField</TimeField.Label>
            <TimeField.Group>
                <TimeField.Input type='hour' />
            </TimeField.Group>
        </TimeField.Root>
    )
}

export const Day: Story = {
    render: (props) => (
        <TimeField.Root {...props}>
            <TimeField.Label>TimeField</TimeField.Label>
            <TimeField.Group>
                <TimeField.Input type='day' />
            </TimeField.Group>
        </TimeField.Root>
    )
}

export const Week: Story = {
    render: (props) => (
        <TimeField.Root {...props}>
            <TimeField.Label>TimeField</TimeField.Label>
            <TimeField.Group>
                <TimeField.Input type='week' />
            </TimeField.Group>
        </TimeField.Root>
    )
}
