import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { cx } from 'tailwind-variants/utils'

export type AutocompleteGroupLabelProps = BaseAutocomplete.GroupLabel.Props

export function AutocompleteGroupLabel({
    className,
    ...props
}: AutocompleteGroupLabelProps): React.JSX.Element {
    const classNames = cx('autocomplete-group-label', className)

    return <BaseAutocomplete.GroupLabel className={classNames} {...props} />
}
