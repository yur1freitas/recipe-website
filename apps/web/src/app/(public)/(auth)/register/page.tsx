'use client'

import type { CapWidget } from '@cap.js/widget'

import {
    Suspense,
    useActionState,
    useEffect,
    useRef,
    useTransition
} from 'react'

import z from 'zod'

import { $emailSchema, $passwordSchema, $usernameSchema } from '@core/shared'

import { registerUserAction } from '~/actions/registerUserAction'

import { Action } from '~/components/Action'
import { Loading } from '~/components/Loading'

import { useAppForm } from '~/hooks/form'

import { CAPTCHA_ENDPOINT } from '~/env'

const schema = z
    .object({
        name: $usernameSchema,
        email: $emailSchema,
        password: $passwordSchema,
        confirmPassword: z.string(),
        captcha: z.string().nonempty('É necessário resolver o captcha')
    })

export default function Page(): React.JSX.Element {
    const widgetRef = useRef<CapWidget | null>(null)

    const [actionState, formAction] = useActionState(registerUserAction, {
        status: 'none'
    })

    const [isPending, startTransition] = useTransition()

    const form = useAppForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            captcha: ''
        },
        validators: {
            onChange: schema,
            onSubmit: schema
        },
        onSubmit: ({ value }) => {
            const { name, email, password, captcha } = value

            startTransition(() =>
                formAction({ name, email, password, captcha })
            )
        }
    })

    useEffect(() => {
        const widget = widgetRef.current

        if (widget && actionState.status === 'failed') {
            widget.reset()
        }
    }, [widgetRef, actionState])

    return (
        <div className='card w-full md:w-lg bg-base-100 dark:bg-base-300 border border-base-200 shadow-sm'>
            <div className='card-body gap-y-4'>
                <div className='flex flex-col gap-y-2 py-4'>
                    <h2 className='text-3xl font-semibold'>
                        Criar Conta
                    </h2>
                    <small className='text-sm text-base-content/50'>
                        Cadastra-se e estará pronto para poder enviar suas
                        receitas!
                    </small>
                </div>
                <Suspense fallback={<Loading label='Carregando...' />}>
                    <form
                        className='flex flex-col gap-y-8'
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <div className='flex flex-col gap-y-2'>
                            <form.AppField
                                name='name'
                                children={(field) => (
                                    <field.Root>
                                        <field.Label>Nome</field.Label>
                                        <field.Input
                                            type='text'
                                            placeholder='Fulano da Silva'
                                            required
                                        />
                                        <field.Info />
                                    </field.Root>
                                )}
                            />
                            <form.AppField
                                name='email'
                                children={(field) => (
                                    <field.Root>
                                        <field.Label>E-mail</field.Label>
                                        <field.Input
                                            type='email'
                                            placeholder='exemplo@gmail.com'
                                            required
                                        />
                                        <field.Info />
                                    </field.Root>
                                )}
                            />
                            <form.AppField
                                name='password'
                                children={(field) => (
                                    <field.Root>
                                        <field.Label>Senha</field.Label>
                                        <field.Password />
                                        <field.Info />
                                    </field.Root>
                                )}
                            />
                            <form.AppField
                                name='confirmPassword'
                                validators={{
                                    onChangeListenTo: ['password'],
                                    onChange: ({ value, fieldApi }) => {
                                        const password = fieldApi
                                            .form
                                            .getFieldValue('password')

                                        if (
                                            value !== password
                                        ) {
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
                                            Confirmar Senha
                                        </field.Label>
                                        <field.Password />
                                        <field.Info />
                                    </field.Root>
                                )}
                            </form.AppField>
                        </div>
                        <form.AppField
                            name='captcha'
                            children={(field) => (
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
                                        i18nErrorAriaLabel='Não foi possível veificar se você é humano'
                                        endpoint={CAPTCHA_ENDPOINT}
                                    />
                                    <field.Info />
                                </field.Root>
                            )}
                        />
                        <form.AppForm>
                            <form.Submit isPending={isPending}>
                                Continuar
                            </form.Submit>
                        </form.AppForm>
                        <Action
                            state={actionState}
                            isPending={isPending}
                        />
                    </form>
                </Suspense>
                <small className='text-sm text-base-content/75 flex gap-1'>
                    Já possui uma conta?
                    <a href='/login' className='link'>
                        Clique aqui
                    </a>
                </small>
            </div>
        </div>
    )
}
