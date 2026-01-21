import type { Meta, StoryObj } from '@storybook/react-vite'

import { Collapsible } from '~/components/Collapsible'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Collapsible',
    component: Collapsible.Root,
    render: (props) => (
        <Collapsible.Root {...props}>
            <Collapsible.Trigger>
                <Collapsible.Icon />
                Info
            </Collapsible.Trigger>
            <Collapsible.Panel>
                <div className='p-2'>
                    <p>
                        Vernacular architecture is building done outside any
                        academic tradition, and without professional guidance.
                        It is not a particular architectural movement or style,
                        but rather a broad category, encompassing a wide range
                        and variety of building types, with differing methods of
                        construction, from around the world, both historical and
                        extant and classical and modern. Vernacular architecture
                        constitutes 95% of the world's built environment, as
                        estimated in 1995 by Amos Rapoport, as measured against
                        the small percentage of new buildings every year
                        designed by architects and built by engineers.
                    </p>
                </div>
            </Collapsible.Panel>
        </Collapsible.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Collapsible.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
