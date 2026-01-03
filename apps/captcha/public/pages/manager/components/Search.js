'use strict'

import { html } from '../../../lib/ui/html.js'

import { Icons } from '../components/Icons.js'

import { useSearch } from '../hooks/useSearch.js'
import { SearchProvider } from '../contexts/SearchContext.js'

const SearchRoot = SearchProvider

const SearchBar = () => {
    const { setSearch } = useSearch()

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const search = formData.get('search') ?? ''

        setSearch(search)
    }

    return html`
         <form 
            action="#" 
            class="search-form"
            onSubmit=${submitHandler}
        >
             <div class="field">
                 <input
                      id="search"
                      name="search"
                      type="search"
                      class="input"
                      placeholder="Procurar chaves..."
                 />
             </div>
            <button type="submit" class="btn btn-icon">
                <${Icons.SearchIcon}/>
            </button>
        </form>
    `
}

export const Search = {
    Root: SearchRoot,
    Bar: SearchBar
}
