import { useId } from 'react'

import type { StepInput } from '@core/cooking'

import { Typography } from '@ui/core/Typography'
import { ScrollArea } from '@ui/core/ScrollArea'
import { Field } from '@ui/core/Field'
import { Collapsible } from '@ui/core/Collapsible'

export interface RecipePreviewStepsProps {
    items: StepInput[]
}

export function RecipePreviewSteps({
    items
}: RecipePreviewStepsProps): React.JSX.Element {
    const listItems = items.map((item, i) => {
        const key = `Step-${i}`
        const value = item.description
        const name = `recipe.step[${i}]`

        return (
            <li key={key}>
                <Field.Root className='sr-only'>
                    <Field.Label>Etapa {i + 1}</Field.Label>
                    <Field.Control
                        name={name}
                        value={value}
                        required
                        readOnly
                    />
                </Field.Root>
                <Typography.Paragraph
                    aria-hidden
                    className='whitespace-pre-wrap break-normal'
                >
                    {value}
                </Typography.Paragraph>
            </li>
        )
    })

    const id = useId()
    const description =
        items.length > 0 ? `N.º Etapas: ${items.length}` : 'Nenhuma etapa...'

    return (
        <Collapsible.Root>
            <Collapsible.Trigger>
                <Collapsible.Icon />
                Etapas
            </Collapsible.Trigger>
            <Collapsible.Panel keepMounted>
                <ScrollArea.Root className='mt-2 shrink-0 h-72 w-full'>
                    <ScrollArea.Viewport>
                        <ScrollArea.Content className='p-1'>
                            <Typography.Small
                                id={id}
                                className='text-muted-foreground sticky top-2 px-2 py-1 bg-muted rounded'
                            >
                                {description}
                            </Typography.Small>
                            <Typography.List
                                variant='decimal'
                                aria-describedby={id}
                                className='my-0'
                            >
                                {listItems}
                            </Typography.List>
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                </ScrollArea.Root>
            </Collapsible.Panel>
        </Collapsible.Root>
    )
}
