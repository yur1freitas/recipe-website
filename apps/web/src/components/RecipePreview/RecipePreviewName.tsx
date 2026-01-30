import { Typography } from '@ui/core/Typography'
import { Field } from '@ui/core/Field'

export interface RecipePreviewNameProps {
    value?: string
}

export function RecipePreviewName({
    value
}: RecipePreviewNameProps): React.JSX.Element {
    return (
        <>
            <Field.Root className='sr-only'>
                <Field.Label>Nome</Field.Label>
                <Field.Control
                    variant='value-only'
                    name='name'
                    value={value}
                    required
                    readOnly
                />
            </Field.Root>
            <Typography.H3 aria-hidden>{value}</Typography.H3>
        </>
    )
}
