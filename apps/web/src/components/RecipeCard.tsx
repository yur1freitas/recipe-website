import Link from 'next/link'

import type { DifficultyEnum } from '@core/cooking'

import type { CardProps } from '@ui/core/Card'
import { Card } from '@ui/core/Card'

import { DifficultyIcon } from './DifficultyIcon'

export interface RecipeCardData {
    id: string
    name: string
    description: string
    difficulty: DifficultyEnum
}

export interface RecipeCardProps extends CardProps.Root {
    data: RecipeCardData
}

export function RecipeCard({
    data,
    ...props
}: RecipeCardProps): React.JSX.Element {
    const href = `/recipes/${data.id}`

    return (
        <Card.Root
            size='sm'
            className='w-full max-w-md relative overflow-hidden'
            {...props}
        >
            <div className='absolute inset-0 z-30 aspect-video bg-black/35' />
            <img
                alt={`Foto de: ${data.name}`}
                className='relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 select-none'
            />
            <Card.Header className='pb-2 flex-1 grid-cols-[1fr_auto]'>
                <DifficultyIcon
                    type={data.difficulty}
                    className='col-start-2 row-span-2'
                />
                <Card.Title className='row-start-1'>{data.name}</Card.Title>
                <Card.Description className='line-clamp-3'>
                    {data.description}
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Link href={href} className='btn btn-primary btn-sm w-full'>
                    Acessar
                </Link>
            </Card.Footer>
        </Card.Root>
    )
}
