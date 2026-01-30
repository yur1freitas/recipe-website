import { BadgeAlertIcon } from 'lucide-react'

import { Typography } from '@ui/core/Typography'
import { Icon } from '@ui/core/Icon'
import { Field } from '@ui/core/Field'

export interface RecipePreviewDifficultyProps {
    value?: string
}

export function RecipePreviewDifficulty({
    value
}: RecipePreviewDifficultyProps): React.JSX.Element {
    return (
        <>
            <Field.Root className='sr-only'>
                <Field.Label>Dificuldade:</Field.Label>
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
                    <BadgeAlertIcon />
                </Icon>
                <span>{value}</span>
            </Typography.Paragraph>
        </>
    )
}
