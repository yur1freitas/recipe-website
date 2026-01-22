import type { Meta, StoryObj } from '@storybook/react-vite'

import { TimeFieldset } from '../components/TimeFieldset'

const meta = {
    tags: ['autodocs'],
    title: 'Example/TimeField',
    component: TimeFieldset.Root,
    subcomponents: {
        Label: TimeFieldset.Label,
        Group: TimeFieldset.Group,
        Input: TimeFieldset.Label
    },
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof TimeFieldset.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Millisecond: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeField</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Input type='ms' />
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Second: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeField</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Input type='second' />
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Minute: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeField</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Input type='minute' />
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Hour: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeField</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Input type='hour' />
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Day: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeField</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Input type='day' />
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Week: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeField</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Input type='week' />
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}
