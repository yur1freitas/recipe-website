'use server'

import { cookies } from 'next/headers'
import { updateTag } from 'next/cache'

import { httpClient } from '~/client/http'

export type RegisterRecipeActionInput = string

export async function registerRecipeAction(
    _: ActionState,
    data: RegisterRecipeActionInput
): Promise<ActionState> {
    const {
        name,
        description,
        difficulty,
        preparationTime,
        steps,
        tools,
        ingredients
    } = JSON.parse(data)

    const cookieStore = await cookies()

    const { error } = await httpClient.POST('/cooking/recipes', {
        body: {
            name,
            description,
            difficulty,
            preparationTime,
            steps,
            tools,
            ingredients
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (error) {
        return { status: 'failed', error: error.message }
    }

    updateTag('recipes')

    return { status: 'success' }
}
