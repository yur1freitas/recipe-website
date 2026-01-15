import { Select as BaseSelect } from '@base-ui/react/select'

export type SelectRootProps<
    Value,
    Multiple extends boolean | undefined = false
> = BaseSelect.Root.Props<Value, Multiple>

export const SelectRoot = BaseSelect.Root
