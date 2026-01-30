'use client'

import { useActionState, useTransition } from 'react'

import { Progress } from '@ui/core/Progress'
import { useStep } from '@ui/core/hooks/useStep'
import { Box } from '@ui/core/Box'

import { useAppForm } from '~/hooks/form'
import { FormStepContext } from '~/contexts/FormStepContext'
import { recipeFormOptions } from '~/components/RecipeForm/options'
import { RecipeForm } from '~/components/RecipeForm'
import { registerRecipeAction } from '~/actions/registerRecipeAction'

const FORM_STEPS = [
    RecipeForm.Base,
    RecipeForm.Ingredient,
    RecipeForm.Tool,
    RecipeForm.Step,
    RecipeForm.Preview
]

export default function Page(): React.JSX.Element {
    const [isPending, startTransition] = useTransition()
    const [actionState, formAction] = useActionState(registerRecipeAction, {
        status: 'none'
    })

    const value = useStep(FORM_STEPS.length - 1)
    const progress = (100 / FORM_STEPS.length) * (value.step + 1)

    const form = useAppForm({
        ...recipeFormOptions,
        onSubmit: ({ value }) => {
            const {
                name,
                description,
                difficulty,
                preparationTime,
                steps,
                tools,
                ingredients
            } = value

            startTransition(() =>
                formAction(
                    JSON.stringify({
                        name,
                        description,
                        difficulty,
                        preparationTime,
                        steps,
                        tools,
                        ingredients
                    })
                )
            )
        }
    })

    const Child = FORM_STEPS[value.step]

    return (
        <Box>
            <Progress.Root value={progress}>
                <Progress.Label>Progresso</Progress.Label>
                <Progress.Value />
                <Progress.Track>
                    <Progress.Indicator />
                </Progress.Track>
            </Progress.Root>
            <FormStepContext.Provider value={value}>
                <Child
                    form={form}
                    isPending={isPending}
                    actionState={actionState}
                />
            </FormStepContext.Provider>
        </Box>
    )
}
