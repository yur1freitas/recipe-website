'use client'

import { Typography } from '@ui/core/Typography'

import { AccountPassword } from './AccountPassword'

export function AccountSecurity(): React.JSX.Element {
    return (
        <div className='flex flex-col gap-y-4 px-4 py-8'>
            <div className='py-4'>
                <Typography.H3>Segurança</Typography.H3>
                <Typography.Small className='text-muted-foreground font-medium'>
                    Opções de segurança da conta
                </Typography.Small>
            </div>
            <div className='flex flex-col gap-y-8'>
                <div className='border-b border-border pb-4'>
                    <div className='flex items-center justify-between gap-4'>
                        <div>
                            <Typography.Paragraph className='font-semibold'>
                                Senha
                            </Typography.Paragraph>
                        </div>
                        <AccountPassword />
                    </div>
                </div>
            </div>
        </div>
    )
}
