'use client'

import type { CapWidget } from '@cap.js/widget'

import z from 'zod'
import { useActionState, useEffect, useRef, useTransition } from 'react'

import { passwordSchema } from '@core/shared'

import { useBoolean } from '@ui/core/hooks/useBoolean'
import { Dialog } from '@ui/core/Dialog'

import { useAppForm } from '~/hooks/form'
import { CAPTCHA_ENDPOINT } from '~/env'
import { updateUserAction } from '~/actions/updateUserAction'

import { Action } from '../Action'

const schema = z.object({
    password: passwordSchema,
    confirmPassword: z.string(),
    captcha: z.string().nonempty('É necessário resolver o captcha')
})

export function AccountPassword(): React.JSX.Element {
    const {
        value: isDialogOpen,
        setValue: setIsDialogOpen,
        setFalse: closeDialog
    } = useBoolean()

    const widgetRef = useRef<CapWidget | null>(null)

    const [isPending, startTransition] = useTransition()
    const [actionState, formAction] = useActionState(updateUserAction, {
        status: 'none'
    })

    const form = useAppForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
            captcha: ''
        },
        validators: {
            onSubmit: schema,
            onChange: schema
        },
        onSubmit: ({ value }) => {
            const { password, captcha } = value

            startTransition(() => formAction({ password, captcha }))
        }
    })

    useEffect(() => {
        const widget = widgetRef.current

        if (widget && actionState.status !== 'none') {
            widget.reset()
        }

        if (actionState.status === 'success') {
            closeDialog()
        }
    }, [closeDialog, widgetRef, actionState])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger size='sm' variant='outline'>
                Mudar Senha
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Popup size='xs'>
                    <div>
                        <div className='py-4'>
                            <Dialog.Title>Mudar Senha</Dialog.Title>
                        </div>
                        <form
                            className='flex flex-col gap-y-8'
                            onSubmit={handleSubmit}
                        >
                            <form.AppField name='password'>
                                {(field) => (
                                    <field.Root>
                                        <field.Label>Nova Senha</field.Label>
                                        <field.Password required />
                                        <field.Info />
                                    </field.Root>
                                )}
                            </form.AppField>

                            <form.AppField
                                name='confirmPassword'
                                validators={{
                                    onChangeListenTo: ['password'],
                                    onChange: ({ value, fieldApi }) => {
                                        const password =
                                            fieldApi.form.getFieldValue(
                                                'password'
                                            )

                                        if (value !== password) {
                                            return {
                                                message:
                                                    'As senhas não correspondem'
                                            }
                                        }
                                    }
                                }}
                            >
                                {(field) => (
                                    <field.Root>
                                        <field.Label>
                                            Confirmar Nova Senha
                                        </field.Label>
                                        <field.Password required />
                                        <field.Info />
                                    </field.Root>
                                )}
                            </form.AppField>
                            <form.AppField name='captcha'>
                                {(field) => (
                                    <field.Root>
                                        <field.Captcha
                                            ref={widgetRef}
                                            i18nVerifying='Verificando...'
                                            i18nInitial='Sou humano'
                                            i18nSolved='Confirmado'
                                            i18nError='Não foi possível verificá-lo'
                                            i18nVerifyAriaLabel='Clique para verificar se você é humano'
                                            i18nVerifyingAriaLabel='Verificando se você é humano'
                                            i18nVerifiedAriaLabel='Está confirmado que você é humano'
                                            i18nErrorAriaLabel='Não foi possível verificar se você é humano'
                                            endpoint={CAPTCHA_ENDPOINT}
                                        />
                                        <field.Info />
                                    </field.Root>
                                )}
                            </form.AppField>
                            <div className='flex justify-end gap-x-2 mt-auto'>
                                <Dialog.Close variant='outline' size='sm'>
                                    Cancelar
                                </Dialog.Close>
                                <form.AppForm>
                                    <form.Submit size='sm'>Salvar</form.Submit>
                                </form.AppForm>
                            </div>
                            <Action state={actionState} isPending={isPending} />
                        </form>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
