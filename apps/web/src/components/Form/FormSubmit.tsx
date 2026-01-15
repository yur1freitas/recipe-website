import type { AnyFormState } from '@tanstack/react-form'
import type { ComponentProps } from 'react'

import { useFormContext } from '~/contexts/form'

import { Loading } from '../Loading'

export interface FormSubmitProps extends ComponentProps<'button'> {
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
                <button
                    type='submit'
                    disabled={isInvalid}
                    className='btn btn-md btn-accent data-[submit=true]:animate-pulse'
                    {...props}
                >
                    {isSubmitting ? <Loading /> : children}
                </button>
            )}
        </form.Subscribe>
    )
}
