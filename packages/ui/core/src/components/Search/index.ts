import type { SearchRootProps } from './SearchRoot'
import type { SearchInputProps } from './SearchInput'
import type { SearchCancelButtonProps } from './SearchCancelButton'
import type { SearchButtonProps } from './SearchButton'

import { SearchRoot } from './SearchRoot'
import { SearchInput } from './SearchInput'
import { SearchCancelButton } from './SearchCancelButton'
import { SearchButton } from './SearchButton'

export const Search = {
    Root: SearchRoot,
    Input: SearchInput,
    Button: SearchButton,
    CancelButton: SearchCancelButton
}

export namespace SearchProps {
    export type Root = SearchRootProps
    export type Input = SearchInputProps
    export type Button = SearchButtonProps
    export type CancelButton = SearchCancelButtonProps
}
