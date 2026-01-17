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

import { emailSchema } from '@core/shared'

import { Typography } from '@ui/core/Typography'
import { Loading } from '@ui/core/Loading'
import { Box } from '@ui/core/Box'

import { loginUserAction } from '~/actions/loginUserAction'
import { Action } from '~/components/Action'
import { useAppForm } from '~/hooks/form'
import { CAPTCHA_ENDPOINT } from '~/env'

const schema = z.object({
    email: emailSchema,
    password: z.string(),
    captcha: z.string().nonempty('É necessário resolver o captcha')
})

export default function Page(): React.JSX.Element {
    const widgetRef = useRef<CapWidget | null>(null)

    const [isPending, startTransition] = useTransition()
    const [actionState, formAction] = useActionState(loginUserAction, {
        status: 'none'
    })

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
        <Box size='xs'>
            <div className='flex flex-col gap-y-4'>
                <div className='py-4'>
                    <Typography.H2>Acessar Conta</Typography.H2>
                    <Typography.Paragraph className='text-muted-foreground'>
                        Acesse sua conta para poder enviar suas receitas!
                    </Typography.Paragraph>
                </div>
                <Suspense fallback={<Loading label='Carregando...' />}>
                    <form
                        className='flex flex-col gap-y-8'
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <div className='flex flex-col gap-y-4'>
                            <form.AppField name='email'>
                                {(field) => (
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
                            </form.AppField>
                            <form.AppField name='password'>
                                {(field) => (
                                    <field.Root>
                                        <field.Label>Senha</field.Label>
                                        <field.Password />
                                        <field.Info />
                                    </field.Root>
                                )}
                            </form.AppField>
                        </div>
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
                                        i18nErrorAriaLabel='Não foi possível veificar se você é humano'
                                        endpoint={CAPTCHA_ENDPOINT}
                                    />
                                    <field.Info />
                                </field.Root>
                            )}
                        </form.AppField>
                        <form.AppForm>
                            <form.Submit size='lg' isPending={isPending}>
                                Continuar
                            </form.Submit>
                        </form.AppForm>
                        <Action state={actionState} isPending={isPending} />
                    </form>
                </Suspense>
                <Typography.Small className='inline-flex gap-1'>
                    Não possui uma conta?
                    <Typography.Link href='/register'>
                        Clique aqui
                    </Typography.Link>
                </Typography.Small>
            </div>
        </Box>
    )
}
