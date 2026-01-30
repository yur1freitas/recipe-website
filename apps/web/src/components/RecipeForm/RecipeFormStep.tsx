import z from 'zod'
import { useRef } from 'react'
import { PlusIcon } from 'lucide-react'
import { arrayRemove } from '@utils/core/arrayRemove'
import { arrayMove } from '@utils/core/arrayMove'
import { useStore } from '@tanstack/react-form'

import { descriptionSchema } from '@core/cooking'

import type { DragHandler } from '@ui/dnd'
import { Typography } from '@ui/core/Typography'
import { Icon } from '@ui/core/Icon'
import { useBoolean } from '@ui/core/hooks/useBoolean'
import { Dialog } from '@ui/core/Dialog'
import { Button } from '@ui/core/Button'

import { useFormStepContext } from '~/hooks/useFormStep'
import { useAppForm, withForm } from '~/hooks/form'

import type { StepItemEvent } from '../StepList'

import { recipeFormOptions } from './options'
import { StepList } from '../StepList'

const schema = z.object({
    description: descriptionSchema
})

const DEFAULT_VALUES: z.infer<typeof schema> = {
    description: ''
}

export const RecipeFormStep = withForm({
    ...recipeFormOptions,
    render: ({ form }) => {
        const editingItemIndex = useRef<number | null>(null)

        const { nextStep, prevStep } = useFormStepContext()

        const {
            value: isDialogOpen,
            setValue: setIsDialogOpen,
            setTrue: openDialog,
            setFalse: closeDialog
        } = useBoolean()

        const { items } = useStore(form.store, (store) => ({
            items: store.values.steps
        }))

        const subForm = useAppForm({
            defaultValues: DEFAULT_VALUES,
            validators: {
                onSubmit: schema,
                onChange: schema
            },
            onSubmit: ({ value }) => {
                if (editingItemIndex.current !== null) {
                    form.setFieldValue(
                        `steps[${editingItemIndex.current}].description`,
                        value.description
                    )

                    editingItemIndex.current = null
                } else {
                    form.pushFieldValue('steps', {
                        order: items.length + 1,
                        description: value.description
                    })
                }

                subForm.reset()
                closeDialog()
            }
        })

        const editHandler = ({ index, data }: StepItemEvent) => {
            editingItemIndex.current = index
            openDialog()

            subForm.setFieldValue('description', data.description)
        }

        const deleteHandler = ({ index }: StepItemEvent) => {
            const updatedItems = arrayRemove(items, index)
            const orderedItems = updatedItems.map((item, i) => ({
                ...item,
                order: i + 1
            }))

            form.setFieldValue('steps', orderedItems)
        }

        const moveHandler: DragHandler.End = (event) => {
            if (event.over !== null && event.active.id !== event.over.id) {
                const fromIndex = items.findIndex(
                    (item) => item.order === event.active.id
                )
                const toIndex = items.findIndex(
                    (item) => item.order === event.over!.id
                )

                const sortedItems = arrayMove(items, fromIndex, toIndex)
                const orderedItems = sortedItems.map((item, i) => ({
                    ...item,
                    order: i + 1
                }))

                form.setFieldValue('steps', orderedItems)
            }
        }

        const closeHandler = () => {
            editingItemIndex.current = null
            subForm.reset()
        }

        const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            e.stopPropagation()
            subForm.handleSubmit()
        }

        return (
            <>
                <div className='py-4'>
                    <Typography.H2>Etapas</Typography.H2>
                    <Typography.Paragraph className='text-muted-foreground font-medium'>
                        Descreva o passo a passo de como preparar a Receita
                    </Typography.Paragraph>
                </div>
                <StepList
                    items={items}
                    onItemMove={moveHandler}
                    onItemEdit={editHandler}
                    onItemDelete={deleteHandler}
                />
                <div className='flex w-full items-center justify-between'>
                    <Dialog.Root
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        disablePointerDismissal
                    >
                        <Dialog.Trigger>
                            <Icon>
                                <PlusIcon />
                            </Icon>
                            Adicionar
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Backdrop />
                            <Dialog.Popup size='xs'>
                                <div className='flex flex-col gap-y-4'>
                                    <div className='py-4'>
                                        <Dialog.Title>
                                            Registrando Etapa
                                        </Dialog.Title>
                                        <Dialog.Description className='text-muted-foreground font-medium'>
                                            Descreva o processo dessa etapa
                                        </Dialog.Description>
                                    </div>
                                    <form
                                        className='flex flex-col gap-y-4'
                                        onSubmit={submitHandler}
                                    >
                                        <subForm.AppField name='description'>
                                            {(field) => (
                                                <field.Root>
                                                    <field.Label>
                                                        Descrição
                                                    </field.Label>
                                                    <field.Textarea
                                                        rows={5}
                                                        className='resize-none'
                                                    />
                                                    <field.Info />
                                                </field.Root>
                                            )}
                                        </subForm.AppField>
                                        <div className='flex w-full items-center justify-end gap-x-2'>
                                            <Dialog.Close
                                                variant='outline'
                                                onClick={closeHandler}
                                            >
                                                Cancelar
                                            </Dialog.Close>
                                            <subForm.AppForm>
                                                <subForm.Submit>
                                                    Salvar
                                                </subForm.Submit>
                                            </subForm.AppForm>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Popup>
                        </Dialog.Portal>
                    </Dialog.Root>
                    <div className='flex items-center gap-x-2'>
                        <Button variant='outline' onClick={prevStep}>
                            Voltar
                        </Button>
                        <Button onClick={nextStep}>Continuar</Button>
                    </div>
                </div>
            </>
        )
    }
})
