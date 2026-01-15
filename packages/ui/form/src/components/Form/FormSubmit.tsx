import type { ButtonProps } from '@ui/core/Button'
import type { AnyFormState } from '@tanstack/react-form'

import { Loading } from '@ui/core/Loading'
import { Button } from '@ui/core/Button'

import { useFormContext } from '~/contexts/form'

export type FormSubmitProps = ButtonProps & {
    isPending?: boolean
}

export function FormSubmit({ children, isPending, ...props }: FormSubmitProps) {
    const form = useFormContext()

    const selector = (state: AnyFormState) => ({
        isInvalid: state.isPristine || !state.isValid,
        isSubmitting: isPending ?? state.isSubmitting
    })

    return (
        <form.Subscribe selector={selector}>
            {({ isInvalid, isSubmitting }) => (
                <Button
                    {...props}
                    nativeButton
                    type='submit'
                    disabled={isInvalid}
                    className='data-[submit=true]:animate-pulse'
                >
                    {isSubmitting ? <Loading /> : children}
                </Button>
            )}
        </form.Subscribe>
    )
}
