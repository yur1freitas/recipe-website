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

import { $emailSchema } from '@core/shared'

import { loginUserAction } from '~/actions/loginUserAction'
import { Loading } from '~/components/Loading'
import { Action } from '~/components/Action'
import { useAppForm } from '~/hooks/form'
import { CAPTCHA_ENDPOINT } from '~/env'

const schema = z.object({
    email: $emailSchema,
    password: z.string(),
    captcha: z.string().nonempty('É necessário resolver o captcha')
})

export default function Page(): React.JSX.Element {
    const widgetRef = useRef<CapWidget | null>(null)

    const [actionState, formAction] = useActionState(loginUserAction, {
        status: 'none'
    })

    const [isPending, startTransition] = useTransition()

    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
            captcha: ''
        },
        validators: {
            onChange: schema,
            onSubmit: schema
        },
        onSubmit: ({ value }) => {
            const { email, password, captcha } = value

            startTransition(() => formAction({ email, password, captcha }))
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
                    <h2 className='text-3xl font-semibold'>Acessar Conta</h2>
                    <small className='text-sm text-base-content/50'>
                        Acesse sua conta para poder enviar suas receitas!
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
                        <Action state={actionState} isPending={isPending} />
                    </form>
                </Suspense>
                <small className='text-sm text-base-content/75 flex gap-1'>
                    Não possui uma conta?
                    <a href='/register' className='link'>
                        Clique aqui
                    </a>
                </small>
            </div>
        </div>
    )
}
