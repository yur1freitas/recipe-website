import { ClockIcon } from 'lucide-react'

import { Typography } from '@ui/core/Typography'
import { Icon } from '@ui/core/Icon'
import { Field } from '@ui/core/Field'

export interface RecipePreviewPreparationTimeProps {
    value?: string
}

export function RecipePreviewPreparationTime({
    value
}: RecipePreviewPreparationTimeProps): React.JSX.Element {
    return (
        <>
            <Field.Root className='sr-only'>
                <Field.Label>Tempo de Preparo:</Field.Label>
                <Field.Control
                    variant='value-only'
                    name='difficulty'
                    value={value}
                    required
                    readOnly
                />
            </Field.Root>
            <Typography.Paragraph
                aria-hidden
                className='m-0 flex items-center gap-x-2'
            >
                <Icon className='size-4'>
                    <ClockIcon />
                </Icon>
                <span>{value}</span>
            </Typography.Paragraph>
        </>
    )
}
