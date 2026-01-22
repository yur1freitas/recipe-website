import type { Meta, StoryObj } from '@storybook/react-vite'

import { TimeFieldset } from '../components/TimeFieldset'

const meta = {
    tags: ['autodocs'],
    title: 'Example/TimeFieldset',
    component: TimeFieldset.Root,
    subcomponents: {
        Label: TimeFieldset.Label,
        Group: TimeFieldset.Group,
        Input: TimeFieldset.Input,
        Legend: TimeFieldset.Legend,
        Field: TimeFieldset.Field
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
            <TimeFieldset.Label>TimeFieldset</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Field type='ms'>
                    <TimeFieldset.Label>Milisegundos</TimeFieldset.Label>
                    <TimeFieldset.Input />
                </TimeFieldset.Field>
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Second: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeFieldset</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Field type='second'>
                    <TimeFieldset.Label>Segundos</TimeFieldset.Label>
                    <TimeFieldset.Input />
                </TimeFieldset.Field>
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Minute: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeFieldset</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Field type='minute'>
                    <TimeFieldset.Label>Minutos</TimeFieldset.Label>
                    <TimeFieldset.Input />
                </TimeFieldset.Field>
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Hour: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeFieldset</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Field type='hour'>
                    <TimeFieldset.Label>Horas</TimeFieldset.Label>
                    <TimeFieldset.Input />
                </TimeFieldset.Field>
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Day: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeFieldset</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Field type='day'>
                    <TimeFieldset.Label>Dias</TimeFieldset.Label>
                    <TimeFieldset.Input />
                </TimeFieldset.Field>
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}

export const Week: Story = {
    render: (props) => (
        <TimeFieldset.Root {...props}>
            <TimeFieldset.Label>TimeFieldset</TimeFieldset.Label>
            <TimeFieldset.Group>
                <TimeFieldset.Field type='week'>
                    <TimeFieldset.Label>Semanas</TimeFieldset.Label>
                    <TimeFieldset.Input />
                </TimeFieldset.Field>
            </TimeFieldset.Group>
        </TimeFieldset.Root>
    )
}
