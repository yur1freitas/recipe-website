'use client'

import { useActionState, useTransition } from 'react'

import { Typography } from '@ui/core/Typography'
import { Button } from '@ui/core/Button'
import { AlertDialog } from '@ui/core/AlertDialog'

import { deleteUserAction } from '~/actions/deleteUserAction'

import { Action } from '../Action'

export function AccountDelete(): React.JSX.Element {
    const [isPending, startTransition] = useTransition()
    const [actionState, formAction] = useActionState(deleteUserAction, {
        status: 'none'
    })

    const handleClick = () => startTransition(formAction)

    return (
        <div className='flex flex-col gap-y-4 px-4 py-8'>
            <div className='py-4'>
                <Typography.H3>Exclusão de Conta</Typography.H3>
                <Typography.Small className='text-muted-foreground font-medium'>
                    Exclua sua conta permanentemente
                </Typography.Small>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <div>
                    <Typography.Paragraph className='font-semibold'>
                        Deletar Conta
                    </Typography.Paragraph>
                    <Typography.Small className='text-muted-foreground'>
                        Essa ação não pode ser desfeita
                    </Typography.Small>
                </div>
                <AlertDialog.Root>
                    <AlertDialog.Trigger size='sm' variant='destructive'>
                        Deletar Conta
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Backdrop />
                        <AlertDialog.Popup>
                            <AlertDialog.Title>
                                Deletar Conta?
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                                Você não pode desfazer essa ação
                            </AlertDialog.Description>
                            <AlertDialog.Actions className='justify-between'>
                                <Action
                                    state={actionState}
                                    isPending={isPending}
                                />
                                <div className='flex gap-x-2 ml-auto'>
                                    <AlertDialog.Close
                                        variant='outline'
                                        disabled={isPending}
                                    >
                                        Cancelar
                                    </AlertDialog.Close>
                                    <Button
                                        variant='destructive'
                                        disabled={isPending}
                                        onClick={handleClick}
                                    >
                                        Deletar
                                    </Button>
                                </div>
                            </AlertDialog.Actions>
                        </AlertDialog.Popup>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </div>
        </div>
    )
}
