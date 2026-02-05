import type { infer as ZodInfer } from 'zod'

import { formOptions } from '@tanstack/react-form'

import { DifficultyEnum, recipeSchema } from '@core/cooking'

const schema = recipeSchema.omit({ id: true, authorId: true })

const DEFAULT_VALUES: ZodInfer<typeof schema> = {
    name: '',
    description: '',
    difficulty: DifficultyEnum.EASY,
    preparationTime: 0,
    steps: [],
    tools: [],
    ingredients: []
}

export const recipeFormOptions = formOptions({
    defaultValues: DEFAULT_VALUES,
    validators: {
        onChange: schema,
        onSubmit: schema
    }
})
