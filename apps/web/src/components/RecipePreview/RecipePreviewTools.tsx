import { useId } from 'react'

import type { ToolInput } from '@core/cooking'

import { Tool } from '@core/cooking'

import { Typography } from '@ui/core/Typography'
import { ScrollArea } from '@ui/core/ScrollArea'
import { Field } from '@ui/core/Field'
import { Collapsible } from '@ui/core/Collapsible'

export interface RecipePreviewToolsProps {
    items: ToolInput[]
}

export function RecipePreviewTools({
    items
}: RecipePreviewToolsProps): React.JSX.Element {
    const listItems = items.map((item, i) => {
        const key = `Ingredient-${i}`
        const value = new Tool(item).format()

        const name = `recipe.tool[${i}]`

        return (
            <li key={key}>
                <Field.Root className='sr-only'>
                    <Field.Label>Utensílio {i + 1}</Field.Label>
                    <Field.Control
                        variant='value-only'
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
        items.length > 0
            ? `N.º Utensílios: ${items.length}`
            : 'Nenhum utensílio...'

    return (
        <Collapsible.Root>
            <Collapsible.Trigger>
                <Collapsible.Icon />
                Utensílios
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
