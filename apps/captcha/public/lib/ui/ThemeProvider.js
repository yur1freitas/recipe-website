'use strict'

import { useSignalEffect } from '@preact/signals'

import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

import { html } from './html.js'
import { useWatcher } from './useWatcher.js'

const ThemeContext = createContext({
    theme: 'system',
    setTheme: () => null
})

export const useTheme = () => {
    const ctx = useContext(ThemeContext)

    if (!ctx) {
        throw new Error('O "useTheme" deve ser usando dentro de "Theme"')
    }

    return ctx
}

export const ThemeProvider = ({
    defaultTheme = 'system',
    storageKey = 'theme',
    children
}) => {
    const theme = useWatcher(
        localStorage.getItem(storageKey) ?? defaultTheme
    )

    useSignalEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        if (theme.value === 'system') {
            const {
                matches: isDark
            } = window.matchMedia('(prefers-color-scheme: dark)')

            const systemTheme = isDark ? 'dark' : 'light'
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    })

    const value = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme)
            theme.value = theme
        }
    }

    return html`<${ThemeContext.Provider} value=${value}>${children}<//>`
}
