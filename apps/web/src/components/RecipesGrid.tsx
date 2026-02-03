'use client'

import { VList } from 'virtua'
import { arrayChunk } from '@utils/core/arrayChunk'

import { useBreakpoint } from '@ui/core/hooks/useBreakpoint'
import { Grid } from '@ui/core/Grid'

import type { RecipeCardData } from './RecipeCard'

import { RecipeCard } from './RecipeCard'

export interface RecipeCardsGridProps {
    data: RecipeCardData[]
}

export function RecipeCardsGrid({
    data
}: RecipeCardsGridProps): React.JSX.Element {
    const { value: columnsAmount } = useBreakpoint({
        default: 1,
        xs: 2,
        md: 3,
        lg: 4
    })

    const rows = arrayChunk(data, columnsAmount!)

    const rowsAmount = rows.length
    const dataAmount = data.length

    return (
        <VList
            data={rows}
            itemSize={352}
            style={{
                width: '100%',
                maxWidth: '80rem',
                height: 'calc(100vh - 6rem)',
                marginInline: 'auto',
                padding: '1rem',
                zIndex: 1
            }}
        >
            {(row, rowIdx) => (
                <Grid
                    key={`Grid-${rowIdx}`}
                    cols={columnsAmount}
                    aria-setsize={rowsAmount}
                    aria-posinset={rowIdx + 1}
                    style={{
                        gap: '0 1rem',
                        marginBlock: '1rem',
                        gridTemplateRows:
                            'repeat(var(--grid-rows), minmax(22rem, 1fr)'
                    }}
                >
                    {row.map((item, itemIdx) => (
                        <RecipeCard
                            key={`RecipeCard-${itemIdx}`}
                            data={item}
                            aria-setsize={dataAmount}
                            aria-posinset={
                                rowIdx * columnsAmount! + itemIdx + 1
                            }
                        />
                    ))}
                </Grid>
            )}
        </VList>
    )
}
