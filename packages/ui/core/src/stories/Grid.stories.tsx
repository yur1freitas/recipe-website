import type { Meta, StoryObj } from '@storybook/react-vite'

import { Grid } from '~/components/Grid'

const Square = () => <div className='size-16 m-1 bg-black rounded' />

const meta = {
    tags: ['autodocs'],
    title: 'Example/Grid',
    component: Grid,
    render: (props) => (
        <Grid {...props}>
            <Square />
            <Square />
            <Square />
        </Grid>
    ),
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        cols: {
            type: {
                name: 'union',
                value: [
                    { name: 'number' },
                    {
                        name: 'object',
                        value: {
                            xs: { name: 'other', value: 'unknown' },
                            sm: { name: 'other', value: 'unknown' },
                            md: { name: 'other', value: 'unknown' },
                            lg: { name: 'other', value: 'unknown' },
                            xl: { name: 'other', value: 'unknown' }
                        }
                    }
                ]
            }
        },
        rows: {
            type: {
                name: 'union',
                value: [
                    { name: 'number' },
                    {
                        name: 'object',
                        value: {
                            xs: { name: 'other', value: 'unknown' },
                            sm: { name: 'other', value: 'unknown' },
                            md: { name: 'other', value: 'unknown' },
                            lg: { name: 'other', value: 'unknown' },
                            xl: { name: 'other', value: 'unknown' }
                        }
                    }
                ]
            }
        }
    },
    args: {}
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithColumns: Story = {
    args: { cols: 3 }
}

export const WithRows: Story = {
    args: { rows: 3 }
}

export const WithColumnsAndRows: Story = {
    args: { cols: 2, rows: 2 }
}

export const Responsive: Story = {
    args: { cols: { default: 1, md: 2 }, rows: { default: 1, md: 2 } }
}
