import type { Meta, StoryObj } from '@storybook/react-vite'

import { Captcha } from '../components/Captcha'

const meta = {
    tags: ['autodocs'],
    title: 'Example/Captcha',
    component: Captcha,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        endpoint: {
            type: 'string',
            control: 'text'
        }
    },
    args: {
        endpoint: ''
    }
} satisfies Meta<typeof Captcha>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
