import type { SelectProps, SelectValueType } from '@ui/core/Select'
import { Select } from '@ui/core/Select'

import { useFieldContext } from '~/contexts/form'

export type FormSelectRootProps<
    TValue,
    TMultiple extends boolean | undefined = false
> = SelectProps.RootProps<TValue, TMultiple>

export function FormSelectRoot<
    TValue,
    TMultiple extends boolean | undefined = false
>(props: FormSelectRootProps<TValue, TMultiple>): React.JSX.Element {
    const { name, state, handleChange } =
        useFieldContext<SelectValueType<TValue, TMultiple>>()

    const changeHandler = (value: SelectValueType<TValue, TMultiple> | null) =>
        handleChange(value!)

    return (
        <Select.Root
            name={name}
            value={state.value}
            onValueChange={changeHandler}
            {...props}
        />
    )
}
