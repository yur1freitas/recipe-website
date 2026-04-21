import type { NumberFieldProps } from '@ui/core/NumberField'

import { NumberField } from '@ui/core/NumberField'

import { useFieldContext } from '~/contexts/form'

export type FormNumberFieldRootProps = NumberFieldProps.Root

export function FormNumberFieldRoot(
    props: FormNumberFieldRootProps
): React.JSX.Element {
    const { name, state, handleChange } = useFieldContext<number>()

    const changeHandler = (value: number | null) => handleChange(value ?? 0)

    return (
        <NumberField.Root
            name={name}
            value={state.value}
            onValueChange={changeHandler}
            {...props}
        />
    )
}
