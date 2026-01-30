import z from 'zod'
import { useRef } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useStore } from '@tanstack/react-form'

import { amountSchema, nameSchema } from '@core/cooking'

import { Typography } from '@ui/core/Typography'
import { NumberField } from '@ui/core/NumberField'
import { Icon } from '@ui/core/Icon'
import { useBoolean } from '@ui/core/hooks/useBoolean'
import { Dialog } from '@ui/core/Dialog'
import { Button } from '@ui/core/Button'

import { useFormStepContext } from '~/hooks/useFormStep'
import { useAppForm, withForm } from '~/hooks/form'

import type { ToolItemEvent } from '../ToolList'

import { recipeFormOptions } from './options'
import { ToolList } from '../ToolList'

const DEFAULT_VALUES: z.infer<typeof schema> = {
    name: '',
    amount: 1
}

const schema = z.object({
    name: nameSchema,
    amount: z.coerce.number<number>().pipe(amountSchema)
})

export const RecipeFormTool = withForm({
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
            items: store.values.tools
        }))

        const subForm = useAppForm({
            defaultValues: DEFAULT_VALUES,
            validators: {
                onSubmit: schema,
                onChange: schema
            },
            onSubmit: ({ value }) => {
                if (editingItemIndex.current !== null) {
                    form.replaceFieldValue(
                        'tools',
                        editingItemIndex.current,
                        value
                    )

                    editingItemIndex.current = null
                } else {
                    form.pushFieldValue('tools', value)
                }

                subForm.reset()
                closeDialog()
            }
        })

        const editHandler = ({ index, data }: ToolItemEvent) => {
            editingItemIndex.current = index
            openDialog()

            subForm.setFieldValue('name', data.name)
            subForm.setFieldValue('amount', data.amount)
        }

        const deleteHandler = ({ index }: ToolItemEvent) => {
            form.removeFieldValue('tools', index)
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
                    <Typography.H2>Utensílios</Typography.H2>
                    <Typography.Paragraph className='text-muted-foreground font-medium'>
                        Informe quais são os utensílios necessário para a
                        Receita (opcional)
                    </Typography.Paragraph>
                </div>
                <ToolList
                    items={items}
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
                            <Dialog.Popup>
                                <div className='flex flex-col gap-y-8'>
                                    <div className='py-4'>
                                        <Dialog.Title>
                                            Registrando Utensílio
                                        </Dialog.Title>
                                        <Dialog.Description className='text-muted-foreground font-medium'>
                                            Informe a quantidade e nome do
                                            utensílio
                                        </Dialog.Description>
                                    </div>
                                    <form
                                        className='flex flex-col gap-y-8'
                                        onSubmit={submitHandler}
                                    >
                                        <subForm.AppField name='amount'>
                                            {(field) => (
                                                <field.Root>
                                                    <field.NumberField min={1}>
                                                        <field.Label>
                                                            Quantidade
                                                        </field.Label>
                                                        <NumberField.Group>
                                                            <NumberField.Decrement>
                                                                <MinusIcon />
                                                            </NumberField.Decrement>
                                                            <field.NumberFieldInput />
                                                            <NumberField.Increment>
                                                                <PlusIcon />
                                                            </NumberField.Increment>
                                                        </NumberField.Group>
                                                    </field.NumberField>
                                                    <field.Info />
                                                </field.Root>
                                            )}
                                        </subForm.AppField>
                                        <subForm.AppField name='name'>
                                            {(field) => (
                                                <field.Root>
                                                    <field.Label>
                                                        Nome
                                                    </field.Label>
                                                    <field.Input
                                                        type='text'
                                                        placeholder='Ex. Colher de Pau'
                                                        required
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
