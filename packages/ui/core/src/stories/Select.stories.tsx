import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckIcon } from 'lucide-react'

import { Select } from '../components/Select'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Select',
    component: Select.Root,
    render: (props) => (
        <Select.Root {...props}>
            <Select.Trigger>
                <Select.Value placeholder='Selecione' />
                <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner sideOffset={8}>
                    <Select.Popup>
                        <Select.ScrollUpArrow />
                        <Select.List>
                            <Select.Item value='A'>
                                <Select.ItemIndicator>
                                    <CheckIcon />
                                </Select.ItemIndicator>
                                <Select.ItemText>A</Select.ItemText>
                            </Select.Item>
                            <Select.Item value='B'>
                                <Select.ItemIndicator>
                                    <CheckIcon />
                                </Select.ItemIndicator>
                                <Select.ItemText>B</Select.ItemText>
                            </Select.Item>
                            <Select.Item value='C'>
                                <Select.ItemIndicator>
                                    <CheckIcon />
                                </Select.ItemIndicator>
                                <Select.ItemText>C</Select.ItemText>
                            </Select.Item>
                        </Select.List>
                        <Select.ScrollDownArrow />
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Select.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
