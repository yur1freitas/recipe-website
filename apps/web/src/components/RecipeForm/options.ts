import type { infer as ZodInfer } from 'zod'

import { Time } from '@utils/time'
import { formOptions } from '@tanstack/react-form'

import { DifficultyEnum, recipeSchema } from '@core/cooking'

const DEFAULT_VALUES: ZodInfer<typeof schema> = {
    name: '',
    description: '',
    difficulty: DifficultyEnum.EASY,
    preparationTime: new Time(),
    steps: [],
    tools: [],
    ingredients: []
}

const schema = recipeSchema.omit({ id: true, authorId: true })

export const recipeFormOptions = formOptions({
    defaultValues: DEFAULT_VALUES,
    validators: {
        onChange: schema,
        onSubmit: schema
    }
})
