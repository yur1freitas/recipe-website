import type { infer as ZodInfer } from 'zod'

import { useRef } from 'react'
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import { Numeric } from '@utils/numeric'
import { useStore } from '@tanstack/react-form'

import { ingredientSchema, UNIT_NAMES, UnitEnum } from '@core/cooking'

import { Typography } from '@ui/core/Typography'
import { Select } from '@ui/core/Select'
import { Icon } from '@ui/core/Icon'
import { useBoolean } from '@ui/core/hooks/useBoolean'
import { Dialog } from '@ui/core/Dialog'
import { Button } from '@ui/core/Button'

import { useFormStepContext } from '~/hooks/useFormStep'
import { useAppForm, withForm } from '~/hooks/form'

import type { IngredientItemEvent } from '../IngredientList'

import { recipeFormOptions } from './options'
import { IngredientList } from '../IngredientList'

const DEFAULT_VALUES: ZodInfer<typeof schema> = {
    name: '',
    measure: new Numeric('1'),
    unit: UnitEnum.MILLIGRAM
}

const schema = ingredientSchema.omit({ id: true })

const UNIT_ITEMS = Object.entries(UNIT_NAMES).map(([value, label]) => ({
    label: `${label.singular} (${value})`,
    value
}))

const selectItems = UNIT_ITEMS.map(({ label, value }) => (
    <Select.Item key={value} value={value}>
        <Select.ItemIndicator>
            <CheckIcon />
        </Select.ItemIndicator>
        <Select.ItemText>{label}</Select.ItemText>
    </Select.Item>
))

export const RecipeFormIngredient = withForm({
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
            items: store.values.ingredients
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
                        'ingredients',
                        editingItemIndex.current,
                        value
                    )

                    editingItemIndex.current = null
                } else {
                    form.pushFieldValue('ingredients', value)
                }

                subForm.reset()
                closeDialog()
            }
        })

        const editHandler = ({ index, data }: IngredientItemEvent) => {
            editingItemIndex.current = index
            openDialog()

            subForm.setFieldValue('name', data.name)
            subForm.setFieldValue('unit', data.unit)
            subForm.setFieldValue('measure', data.measure)
        }

        const deleteHandler = ({ index }: IngredientItemEvent) => {
            form.removeFieldValue('ingredients', index)
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
                    <Typography.H2>Ingredientes</Typography.H2>
                    <Typography.Paragraph className='text-muted-foreground font-medium'>
                        Liste os ingredientes necessários para a Receita
                    </Typography.Paragraph>
                </div>
                <IngredientList
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
                                <div>
                                    <div className='py-4'>
                                        <Dialog.Title>
                                            Registrando Ingrediente
                                        </Dialog.Title>
                                        <Dialog.Description className='text-muted-foreground font-medium'>
                                            Informe o nome do ingrediente e a
                                            medida necessária
                                        </Dialog.Description>
                                    </div>
                                    <form
                                        className='flex flex-col gap-y-8'
                                        onSubmit={submitHandler}
                                    >
                                        <subForm.AppField name='measure'>
                                            {(field) => (
                                                <field.Root>
                                                    <field.Label>
                                                        Quantidade
                                                    </field.Label>
                                                    <field.NumbericInput
                                                        placeholder='Ex. 3 1/2'
                                                        required
                                                    />
                                                    <field.Info />
                                                </field.Root>
                                            )}
                                        </subForm.AppField>
                                        <subForm.AppField name='unit'>
                                            {(field) => (
                                                <field.Root>
                                                    <field.Label>
                                                        Unidade de Medida
                                                    </field.Label>
                                                    <field.Select
                                                        items={UNIT_ITEMS}
                                                    >
                                                        <field.SelectTrigger className='w-full'>
                                                            <Select.Value />
                                                            <Select.Icon>
                                                                <ChevronsUpDownIcon />
                                                            </Select.Icon>
                                                        </field.SelectTrigger>
                                                        <Select.Portal>
                                                            <Select.Positioner>
                                                                <Select.Popup>
                                                                    <Select.ScrollUpArrow />
                                                                    <Select.List>
                                                                        {
                                                                            selectItems
                                                                        }
                                                                    </Select.List>
                                                                    <Select.ScrollDownArrow />
                                                                </Select.Popup>
                                                            </Select.Positioner>
                                                        </Select.Portal>
                                                    </field.Select>
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
                                                        placeholder='Ex. Farinha'
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
