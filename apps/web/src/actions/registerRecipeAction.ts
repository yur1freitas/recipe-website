'use server'

import { cookies } from 'next/headers'

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
    const accessToken = cookieStore.get('accessToken')?.value ?? ''

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
        params: {
            cookie: { accessToken }
        }
    })

    if (error) {
        return { status: 'failed', error: error.message }
    }

    return { status: 'success' }
}
