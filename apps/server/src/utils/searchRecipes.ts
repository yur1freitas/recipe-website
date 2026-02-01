import type { DBQueryConfig } from 'drizzle-orm'

import type { RecipeProps } from '@core/cooking'

import { pg } from '~/db/pg'

export type SearchRecipesInput =
    | {
          limit: number
          offset: number
          search?: string
      }
    | {
          limit?: number
          offset?: number
          search: string
      }

export type SearchRecipesOutput = RecipeProps[]

export async function searchRecipes({
    limit,
    offset,
    search
}: SearchRecipesInput): Promise<SearchRecipesOutput> {
    const where: DBQueryConfig<'many'>['where'] =
        typeof search !== 'undefined'
            ? (fields, { sql }) => {
                  return sql`to_tsvector('portuguese', ${fields.name}) @@ to_tsquery('portuguese', ${search})`
              }
            : search

    return pg.query.recipes.findMany({
        limit,
        offset,
        where,
        columns: { pk: false },
        with: {
            ingredients: { columns: { pk: false } },
            steps: { columns: { pk: false } },
            tools: { columns: { pk: false } }
        }
    })
}
