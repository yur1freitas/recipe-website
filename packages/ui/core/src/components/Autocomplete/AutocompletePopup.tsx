import { cx } from 'tailwind-variants/utils'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

export type AutocompletePopupProps = BaseAutocomplete.Popup.Props

export function AutocompletePopup({
    className,
    ...props
}: AutocompletePopupProps): React.JSX.Element {
    const classNames = cx('autocomplete-popup', className)

    return <BaseAutocomplete.Popup className={classNames} {...props} />
}
