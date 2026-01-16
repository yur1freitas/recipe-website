import type { Meta, StoryObj } from '@storybook/react-vite'

import { Section } from '../components/Section'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Section',
    component: Section,
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {},
    args: {}
} satisfies Meta<typeof Section>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
    args: {
        children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    }
}
