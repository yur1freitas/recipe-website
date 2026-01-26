import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '~/components/Label'

import { Autocomplete } from '../components/Autocomplete'

const items = [
    { value: 'Hello World' },
    { value: 'Hi Mommy!' },
    { value: 'OMG!' }
] as const

const meta = {
    tags: ['autodocs'],
    title: 'Example/Autocomplete',
    component: Autocomplete.Root,
    render: (props) => (
        <Autocomplete.Root items={items} {...props}>
            <Label>
                Buscar valor
                <Autocomplete.Input placeholder='ex. Valor' />
            </Label>
            <Autocomplete.Portal>
                <Autocomplete.Positioner sideOffset={4}>
                    <Autocomplete.Popup>
                        <Autocomplete.Empty>
                            Valor não encontrado:
                        </Autocomplete.Empty>
                        <Autocomplete.List>
                            {(item) => (
                                <Autocomplete.Item value={item.value}>
                                    {item.value}
                                </Autocomplete.Item>
                            )}
                        </Autocomplete.List>
                    </Autocomplete.Popup>
                </Autocomplete.Positioner>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    ),
    parameters: {},
    argTypes: {},
    args: {}
} satisfies Meta<typeof Autocomplete.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Grouped: Story = {
    render: (props) => {
        const groups = [
            { value: 'Linguagens', items: ['JavaScript', 'Rust', 'Go'] },
            { value: 'Frameworks', items: ['Next.JS', 'Fastify', 'Astro'] }
        ]

        return (
            <Autocomplete.Root items={groups} {...props}>
                <Label>
                    Buscar Linguage/Framework
                    <Autocomplete.Input placeholder='ex. Valor' />
                </Label>
                <Autocomplete.Portal>
                    <Autocomplete.Positioner sideOffset={4}>
                        <Autocomplete.Popup>
                            <Autocomplete.Empty>
                                Tecnologia não encontrada:
                            </Autocomplete.Empty>
                            <Autocomplete.List>
                                {(group) => (
                                    <Autocomplete.Group
                                        key={group.value}
                                        items={group.items}
                                    >
                                        <Autocomplete.GroupLabel>
                                            {group.value}
                                        </Autocomplete.GroupLabel>
                                        <Autocomplete.Collection>
                                            {(item) => (
                                                <Autocomplete.Item
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </Autocomplete.Item>
                                            )}
                                        </Autocomplete.Collection>
                                    </Autocomplete.Group>
                                )}
                            </Autocomplete.List>
                        </Autocomplete.Popup>
                    </Autocomplete.Positioner>
                </Autocomplete.Portal>
            </Autocomplete.Root>
        )
    }
}

export const NotFoundMessageWithCurrentValue: Story = {
    render: (props) => (
        <Autocomplete.Root items={items} {...props}>
            <Label>
                Buscar valor
                <Autocomplete.Input placeholder='ex. Valor' />
            </Label>
            <Autocomplete.Portal>
                <Autocomplete.Positioner sideOffset={4}>
                    <Autocomplete.Popup>
                        <Autocomplete.Empty>
                            Valor não encontrado: "{<Autocomplete.Value />}"
                        </Autocomplete.Empty>
                        <Autocomplete.List>
                            {(item) => (
                                <Autocomplete.Item
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.value}
                                </Autocomplete.Item>
                            )}
                        </Autocomplete.List>
                    </Autocomplete.Popup>
                </Autocomplete.Positioner>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    )
}
