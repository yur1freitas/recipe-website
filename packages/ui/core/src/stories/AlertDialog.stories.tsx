import type { Meta, StoryObj } from '@storybook/react-vite'

import { AlertDialog } from '../components/AlertDialog'

const meta = {
    tags: ['autodocs'],
    title: 'Example/AlertDialog',
    component: AlertDialog.Root,
    render: (props) => (
        <AlertDialog.Root {...props}>
            <AlertDialog.Trigger>Deletar Conta</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Backdrop />
                <AlertDialog.Viewport>
                    <AlertDialog.Popup>
                        <AlertDialog.Title>Excluir Conta</AlertDialog.Title>
                        <AlertDialog.Description>
                            Essa ação não pode ser revertida. Tem certeza de que
                            deseja continuar?
                        </AlertDialog.Description>
                        <AlertDialog.Actions>
                            <AlertDialog.Close variant='outline'>
                                Cancelar
                            </AlertDialog.Close>
                            <AlertDialog.Close>Continuar</AlertDialog.Close>
                        </AlertDialog.Actions>
                    </AlertDialog.Popup>
                </AlertDialog.Viewport>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    ),
    parameters: { layout: 'centered' },
    argTypes: {},
    args: {}
} satisfies Meta<typeof AlertDialog.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
