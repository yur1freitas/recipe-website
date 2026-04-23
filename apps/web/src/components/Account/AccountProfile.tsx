'use client'

import type { CapWidget } from '@cap.js/widget'

import z from 'zod'
import { useActionState, useEffect, useRef, useTransition } from 'react'

import { emailSchema, usernameSchema } from '@core/shared'

import { Typography } from '@ui/core/Typography'
import { useBoolean } from '@ui/core/hooks/useBoolean'
import { Field } from '@ui/core/Field'
import { Dialog } from '@ui/core/Dialog'

import { useAuth } from '~/hooks/useAuth'
import { useAppForm } from '~/hooks/form'
import { CAPTCHA_ENDPOINT } from '~/env'
import { updateUserAction } from '~/actions/updateUserAction'

import { Action } from '../Action'

const schema = z.object({
    name: usernameSchema,
    email: emailSchema,
    captcha: z.string().nonempty('É necessário resolver o captcha')
})

export function AccountProfile(): React.JSX.Element {
    const { user } = useAuth()

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
            name: user?.name,
            email: user?.email,
            captcha: ''
        },
        validators: {
            onSubmit: schema,
            onChange: schema
        },
        onSubmit: ({ value }) => {
            const { name, email, captcha } = value

            startTransition(() => formAction({ name, email, captcha }))
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
        <div className='flex flex-col gap-y-4 px-4 py-8'>
            <div className='py-4'>
                <Typography.H3>Perfil</Typography.H3>
                <Typography.Small className='text-muted-foreground font-medium'>
                    Seus dados de perfil
                </Typography.Small>
            </div>
            <div className='flex flex-col gap-y-8'>
                <div className='border-b border-border pb-4'>
                    <Field.Root className='flex flex-row items-center justify-between gap-4'>
                        <Field.Label className='font-medium text-lg'>
                            Nome:
                        </Field.Label>
                        <Field.Control
                            variant='value-only'
                            name='name'
                            value={user?.name}
                            className='w-64'
                            readOnly
                        />
                    </Field.Root>
                </div>
                <div className='border-b border-border pb-4'>
                    <Field.Root className='flex flex-row items-center justify-between gap-4'>
                        <Field.Label className='font-medium text-lg'>
                            Email:
                        </Field.Label>
                        <Field.Control
                            variant='value-only'
                            name='email'
                            value={user?.email}
                            className='w-64'
                            readOnly
                        />
                    </Field.Root>
                </div>
            </div>
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Trigger size='sm' className='ml-auto mt-auto'>
                    Atualizar
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Backdrop />
                    <Dialog.Popup size='xs'>
                        <div>
                            <div className='py-4'>
                                <Dialog.Title>Atualizar Dados</Dialog.Title>
                            </div>
                            <form
                                className='flex flex-col gap-y-8'
                                onSubmit={handleSubmit}
                            >
                                <form.AppField name='name'>
                                    {(field) => (
                                        <field.Root>
                                            <field.Label>Nome</field.Label>
                                            <field.Input type='text' required />
                                            <field.Info />
                                        </field.Root>
                                    )}
                                </form.AppField>
                                <form.AppField name='email'>
                                    {(field) => (
                                        <field.Root>
                                            <field.Label>Email</field.Label>
                                            <field.Input
                                                type='email'
                                                required
                                            />
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
                                        <form.Submit size='sm'>
                                            Salvar
                                        </form.Submit>
                                    </form.AppForm>
                                </div>
                                <Action
                                    state={actionState}
                                    isPending={isPending}
                                />
                            </form>
                        </div>
                    </Dialog.Popup>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
