'use client'

import type { CapWidget } from '@cap.js/widget'

import {
    Suspense,
    useActionState,
    useEffect,
    useRef,
    useTransition
} from 'react'
import { useRouter } from 'next/navigation'
import z from 'zod'

import { emailSchema, passwordSchema, usernameSchema } from '@core/shared'

import { Box } from '@ui/core/Box'
import { Loading } from '@ui/core/Loading'
import { Typography } from '@ui/core/Typography'

import { registerUserAction } from '~/actions/registerUserAction'
import { Action } from '~/components/Action'
import { useAppForm } from '~/hooks/form'
import { CAPTCHA_ENDPOINT } from '~/env'

const schema = z.object({
    name: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    captcha: z.string().nonempty('É necessário resolver o captcha')
})

export default function Page(): React.JSX.Element {
    const widgetRef = useRef<CapWidget | null>(null)

    const [isPending, startTransition] = useTransition()
    const [actionState, formAction] = useActionState(registerUserAction, {
        status: 'none'
    })

    const { replace } = useRouter()

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
        if (actionState.status === 'success') {
            replace('/login')
            return
        }

        const widget = widgetRef.current

        if (widget && actionState.status === 'failed') {
            widget.reset()
        }
    }, [replace, widgetRef, actionState])

    return (
        <Box size='xs'>
            <div className='flex flex-col gap-y-4'>
                <div className='py-4'>
                    <Typography.H2>Criar Conta</Typography.H2>
                    <Typography.Paragraph className='font-medium text-muted-foreground'>
                        Cadastra-se e estará pronto para poder enviar suas
                        receitas!
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
                            <form.AppField name='name'>
                                {(field) => (
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
                            </form.AppField>
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
                                            Confirmar Senha
                                        </field.Label>
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
                <Typography.Small className='inline-flex items-center gap-1'>
                    Já possui uma conta?
                    <Typography.Link href='/login'>Clique aqui</Typography.Link>
                </Typography.Small>
            </div>
        </Box>
    )
}
