import type { Meta, StoryObj } from '@storybook/react-vite'

import { NumberField } from '../components/NumberField'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Label } from '~/components/Label'

const meta = {
    tags: ['autodocs'],
    title: 'Example/NumberField',
    component: NumberField.Root,
    render: (props) => (
        <NumberField.Root {...props}>
            <NumberField.ScrubArea>
                <Label>Amount</Label>
                <NumberField.ScrubAreaCursor />
            </NumberField.ScrubArea>
            <NumberField.Group>
                <NumberField.Decrement>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input />
                <NumberField.Increment>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof NumberField.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInvalidState: Story = {
    render: (props) => (
        <NumberField.Root {...props}>
            <NumberField.ScrubArea>
                <Label>Amount</Label>
                <NumberField.ScrubAreaCursor />
            </NumberField.ScrubArea>
            <NumberField.Group>
                <NumberField.Decrement>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input aria-invalid='true' />
                <NumberField.Increment>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    )
}
