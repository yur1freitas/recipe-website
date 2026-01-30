import { Typography } from '@ui/core/Typography'
import { Field } from '@ui/core/Field'

export interface RecipePreviewDescriptionProps {
    value?: string
}

export function RecipePreviewDescription({
    value
}: RecipePreviewDescriptionProps): React.JSX.Element {
    return (
        <>
            <Field.Root className='sr-only'>
                <Field.Label>Descrição</Field.Label>
                <Field.Control
                    variant='value-only'
                    className='text-muted-foreground font-medium'
                    name='description'
                    value={value}
                    required
                    readOnly
                />
            </Field.Root>
            <Typography.Paragraph
                aria-hidden
                className='text-muted-foreground font-medium'
            >
                {value}
            </Typography.Paragraph>
        </>
    )
}
