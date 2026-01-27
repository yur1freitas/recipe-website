import { cx } from 'tailwind-variants/utils'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

export type AutocompleteEmptyProps = BaseAutocomplete.Empty.Props

export function AutocompleteEmpty({
    className,
    ...props
}: AutocompleteEmptyProps): React.JSX.Element {
    const classNames = cx('autocomplete-empty', className)

    return <BaseAutocomplete.Empty className={classNames} {...props} />
}
