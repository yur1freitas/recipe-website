import { cx } from 'tailwind-variants/utils'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

export type AutocompleteItemProps = BaseAutocomplete.Item.Props

export function AutocompleteItem({
    className,
    ...props
}: AutocompleteItemProps): React.JSX.Element {
    const classNames = cx('autocomplete-item', className)

    return <BaseAutocomplete.Item className={classNames} {...props} />
}
