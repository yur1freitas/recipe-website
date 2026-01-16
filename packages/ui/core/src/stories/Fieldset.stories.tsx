import type { Meta, StoryObj } from '@storybook/react-vite'

import { Fieldset } from '../components/Fieldset'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Fieldset',
    component: Fieldset.Root,
    render: (props) => (
        <Fieldset.Root {...props}>
            <Fieldset.Legend>Legenda</Fieldset.Legend>
        </Fieldset.Root>
    ),
    parameters: {},
    argTypes: {},
    args: {}
} satisfies Meta<typeof Fieldset.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
