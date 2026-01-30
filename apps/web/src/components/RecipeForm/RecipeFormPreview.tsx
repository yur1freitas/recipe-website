import { useStore } from '@tanstack/react-form'

import { Difficulty } from '@core/cooking'

import { Typography } from '@ui/core/Typography'
import { Button } from '@ui/core/Button'

import { useFormStepContext } from '~/hooks/useFormStep'
import { withForm } from '~/hooks/form'

import { recipeFormOptions } from './options'
import { RecipePreview } from '../RecipePreview'
import { Action } from '../Action'

export const RecipeFormPreview = withForm({
    ...recipeFormOptions,
    props: { isPending: false, actionState: { status: 'none' } as ActionState },
    render: ({ form, actionState, isPending }) => {
        const { prevStep } = useFormStepContext()

        const { values } = useStore(form.store, (store) => ({
            values: store.values
        }))

        return (
            <div className='flex flex-col gap-y-4'>
                <div className='py-4'>
                    <Typography.H2>Receita</Typography.H2>
                    <Typography.Paragraph className='text-muted-foreground font-medium'>
                        Revise a sua receita por completo antes de enviá-la para
                        ser cadastrada
                    </Typography.Paragraph>
                </div>

                <RecipePreview.Root
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <div className='flex w-full flex-col gap-y-4 break-all'>
                        <div className='flex flex-col'>
                            <RecipePreview.Name value={values.name} />
                            <RecipePreview.Description
                                value={values.description}
                            />
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <RecipePreview.Difficulty
                                value={new Difficulty(
                                    values.difficulty
                                ).format()}
                            />
                            <RecipePreview.PreparationTime
                                value={`${values.preparationTime.hours}h ${values.preparationTime.minutes}min`}
                            />
                        </div>
                        <RecipePreview.Ingredients items={values.ingredients} />
                        <RecipePreview.Tools items={values.tools} />
                        <RecipePreview.Steps items={values.steps} />
                    </div>

                    <div className='flex flex-col gap-y-2 ml-auto'>
                        <div className='flex justify-end gap-x-2'>
                            <Button
                                variant='outline'
                                onClick={prevStep}
                                disabled={isPending}
                            >
                                Voltar
                            </Button>

                            <form.AppForm>
                                <form.Submit isPending={isPending}>
                                    Finalizar
                                </form.Submit>
                            </form.AppForm>
                        </div>
                        <Action state={actionState} isPending={isPending} />
                    </div>
                </RecipePreview.Root>
            </div>
        )
    }
})
