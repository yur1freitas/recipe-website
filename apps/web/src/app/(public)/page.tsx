'use server'

import { cookies } from 'next/headers'

import type { RecipeCardData } from '~/components/RecipeCard'

import { RecipeCardsGrid } from '~/components/RecipesGrid'
import { Home } from '~/components/Home'
import { httpClient } from '~/client/http'

interface PageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function Page({
    searchParams
}: PageProps): Promise<React.JSX.Element> {
    const { q: search } = await searchParams

    const cookieStore = await cookies()

    const { data = [] } = await httpClient.GET('/cooking/recipes', {
        headers: { Cookie: cookieStore.toString() },
        params: { query: { search } },
        next: {
            tags: ['recipes'],
            revalidate: 3_600 // 1 minuto
        }
    })

    return (
        <Home>
            <RecipeCardsGrid data={data as RecipeCardData[]} />
        </Home>
    )
}
