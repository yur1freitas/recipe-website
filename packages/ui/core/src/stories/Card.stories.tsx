import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '~/components/Card'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Card',
    component: Card.Root,
    render: (props) => (
        <Card.Root {...props}>
            <Card.Header>
                <Card.Title>Título</Card.Title>
                <Card.Description>Descrição</Card.Description>
            </Card.Header>
            <Card.Content>
                <p>
                    Vernacular architecture is building done outside any
                    academic tradition, and without professional guidance. It is
                    not a particular architectural movement or style, but rather
                    a broad category, encompassing a wide range and variety of
                    building types, with differing methods of construction, from
                    around the world, both historical and extant and classical
                    and modern. Vernacular architecture constitutes 95% of the
                    world's built environment, as estimated in 1995 by Amos
                    Rapoport, as measured against the small percentage of new
                    buildings every year designed by architects and built by
                    engineers.
                </p>
            </Card.Content>
            <Card.Footer>Footer</Card.Footer>
        </Card.Root>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        size: {
            type: 'string',
            control: 'select',
            options: ['xs', 'sm', 'md']
        }
    },
    args: {}
} satisfies Meta<typeof Card.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ExtraSmall: Story = { args: { size: 'xs' } }

export const Small: Story = { args: { size: 'sm' } }

export const Medium: Story = { args: { size: 'md' } }
