import { ClockIcon } from 'lucide-react'
import { Time } from '@utils/time'

import { Typography } from '@ui/core/Typography'
import { Icon } from '@ui/core/Icon'
import { Field } from '@ui/core/Field'

export interface RecipePreviewPreparationTimeProps {
    value: number
}

export function RecipePreviewPreparationTime({
    value
}: RecipePreviewPreparationTimeProps): React.JSX.Element {
    const time = Time.fromMilliseconds(value)
    const _value = `${time.hours}h ${time.minutes}min`

    return (
        <>
            <Field.Root className='sr-only'>
                <Field.Label>Tempo de Preparo:</Field.Label>
                <Field.Control
                    variant='value-only'
                    name='difficulty'
                    value={_value}
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
                <span>{_value}</span>
            </Typography.Paragraph>
        </>
    )
}
