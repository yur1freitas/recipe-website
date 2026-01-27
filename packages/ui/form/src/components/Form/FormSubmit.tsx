import type { AnyFormState } from '@tanstack/react-form'

import { Loading } from '@ui/core/Loading'
import { Button } from '@ui/core/Button'
import type { ButtonProps } from '@ui/core/Button'

import { isInvalidForm } from '~/utils/isInvalidForm'
import { useFormContext } from '~/contexts/form'

export type FormSubmitProps = ButtonProps & {
    isPending?: boolean
}

export function FormSubmit({
    children,
    className,
    isPending,
    ...props
}: FormSubmitProps) {
    const form = useFormContext()

    const selector = (state: AnyFormState) => ({
        isInvalid: isInvalidForm(state),
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
                    className={`data-[submit=true]:animate-pulse ${className ?? ''}`.trim()}
                >
                    {isSubmitting ? <Loading /> : children}
                </Button>
            )}
        </form.Subscribe>
    )
}
