import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { cx } from 'tailwind-variants/utils'

export type AutocompleteSeparatorProps = BaseAutocomplete.Separator.Props

export function AutocompleteSeparator({
    className,
    ...props
}: AutocompleteSeparatorProps): React.JSX.Element {
    const classNames = cx('autocomplete-separator', className)

    return <BaseAutocomplete.Separator className={classNames} {...props} />
}
