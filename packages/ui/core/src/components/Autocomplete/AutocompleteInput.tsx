import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { Input } from '../Input'

export type AutocompleteInputProps = BaseAutocomplete.Input.Props

export function AutocompleteInput(
    props: AutocompleteInputProps
): React.JSX.Element {
    return <BaseAutocomplete.Input render={Input} {...props} />
}
