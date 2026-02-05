import { z } from 'zod'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { pickProps } from '@utils/core/pickProps'
import { useStore } from '@tanstack/react-form'

import {
    descriptionSchema,
    DIFFICULTY_NAMES,
    difficultySchema,
    nameSchema,
    preparationTimeSchema
} from '@core/cooking'

import { Typography } from '@ui/core/Typography'
import { TimeFieldset } from '@ui/core/TimeFieldset'
import { Select } from '@ui/core/Select'

import { useFormStepContext } from '~/hooks/useFormStep'
import { useAppForm, withForm } from '~/hooks/form'

import { recipeFormOptions } from './options'

const schema = z.object({
    name: nameSchema,
    description: descriptionSchema,
    difficulty: difficultySchema,
    preparationTime: preparationTimeSchema
})

const DIFFICULTY_ITEMS = Object.entries(DIFFICULTY_NAMES).map(
    ([value, label]) => ({ label, value })
)

const selectItems = DIFFICULTY_ITEMS.map(({ label, value }) => (
    <Select.Item key={value} value={value}>
        <Select.ItemIndicator>
            <CheckIcon />
        </Select.ItemIndicator>
        <Select.ItemText>{label}</Select.ItemText>
    </Select.Item>
))

export const RecipeFormBase = withForm({
    ...recipeFormOptions,
    render: ({ form }) => {
        const { nextStep } = useFormStepContext()

        const { defaultState, defaultValues } = useStore(
            form.store,
            (store) => ({
                defaultValues: pickProps(store.values, [
                    'name',
                    'description',
                    'difficulty',
                    'preparationTime'
                ]),
                defaultState: {
                    fieldMetaBase: pickProps(store.fieldMeta, [
                        'name',
                        'description',
                        'difficulty',
                        'preparationTime'
                    ])
                }
            })
        )

        const subForm = useAppForm({
            defaultState,
            defaultValues,
            validators: {
                onSubmit: schema,
                onChange: schema
            },
            onSubmit: ({ value }) => {
                form.setFieldValue('name', value.name)
                form.setFieldValue('description', value.description)
                form.setFieldValue('difficulty', value.difficulty)
                form.setFieldValue('preparationTime', value.preparationTime)

                nextStep()
            }
        })

        const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            e.stopPropagation()
            subForm.handleSubmit()
        }

        return (
            <>
                <div className='py-4'>
                    <Typography.H2>Informações Básicas</Typography.H2>
                    <Typography.Paragraph className='text-muted-foreground font-medium'>
                        Informe as informações básicas sobre a sua Receita
                    </Typography.Paragraph>
                </div>
                <form
                    className='flex flex-col gap-y-8'
                    onSubmit={submitHandler}
                >
                    <div className='flex flex-col gap-y-4'>
                        <subForm.AppField name='name'>
                            {(field) => (
                                <field.Root>
                                    <field.Label>Nome</field.Label>
                                    <field.Input
                                        type='text'
                                        placeholder='Ex. Pão de Queijo'
                                        required
                                    />
                                    <field.Info />
                                </field.Root>
                            )}
                        </subForm.AppField>
                        <subForm.AppField name='description'>
                            {(field) => (
                                <field.Root>
                                    <field.Label>Descrição</field.Label>
                                    <field.Textarea
                                        rows={3}
                                        className='resize-none'
                                        placeholder='Ex. Pão caseiro macio e saboroso...'
                                        required
                                    />
                                    <field.Info />
                                </field.Root>
                            )}
                        </subForm.AppField>
                        <subForm.AppField name='difficulty'>
                            {(field) => (
                                <field.Root>
                                    <field.Label>Dificuldade</field.Label>
                                    <field.Select
                                        items={DIFFICULTY_ITEMS}
                                        required
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
                                                        {selectItems}
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
                        <subForm.AppField name='preparationTime'>
                            {(field) => (
                                <field.TimeFieldset
                                    onValueChange={(time) =>
                                        field.handleChange(
                                            time.toMilliseconds()
                                        )
                                    }
                                >
                                    <TimeFieldset.Legend>
                                        Tempo de Preparo
                                    </TimeFieldset.Legend>
                                    <TimeFieldset.Group>
                                        <field.Root>
                                            <TimeFieldset.Field type='hour'>
                                                <field.Label>Horas</field.Label>
                                                <TimeFieldset.Input
                                                    aria-label='Horas do Tempo de Preparo'
                                                    name='prepararationTime.hour'
                                                />
                                            </TimeFieldset.Field>
                                            <field.Info />
                                        </field.Root>
                                        <field.Root>
                                            <TimeFieldset.Field type='minute'>
                                                <field.Label>
                                                    Minutos
                                                </field.Label>
                                                <TimeFieldset.Input
                                                    aria-label='Minutos do Tempo de Preparo'
                                                    name='prepararationTime.minute'
                                                />
                                            </TimeFieldset.Field>
                                            <field.Info />
                                        </field.Root>
                                    </TimeFieldset.Group>
                                </field.TimeFieldset>
                            )}
                        </subForm.AppField>
                    </div>
                    <subForm.AppForm>
                        <subForm.Submit size='lg'>Continuar</subForm.Submit>
                    </subForm.AppForm>
                </form>
            </>
        )
    }
})
