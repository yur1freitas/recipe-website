import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

export type AutocompleteListProps = BaseAutocomplete.List.Props

export function AutocompleteList(
    props: AutocompleteListProps
): React.JSX.Element {
    return <BaseAutocomplete.List {...props} />
}
