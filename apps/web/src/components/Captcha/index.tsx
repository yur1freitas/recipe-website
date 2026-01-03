'use client'

import './style.css'

import type { FocusEventHandler, Ref } from 'react'
import { useEffect, useImperativeHandle, useRef } from 'react'

import type { CapWidget } from '@cap.js/widget'

import type {
    CapErrorHandler,
    CapProgressHandler,
    CapResetHandler,
    CapSolveHandler
} from './types'

const loadModule = async (): Promise<void> => {
    await import('@cap.js/widget')
}

export interface CaptchaProps {
    ref?: Ref<CapWidget | null>
    id?: string
    name?: string
    endpoint: string
    onSolve?: (token: string) => void
    onError?: (message: string) => void
    onReset?: () => void
    onProgress?: (progress: number) => void
    onBlur?: FocusEventHandler<CapWidget>
    i18nInitial?: string
    i18nVerifying?: string
    i18nSolved?: string
    i18nError?: string
    i18nVerifyAriaLabel?: string
    i18nVerifyingAriaLabel?: string
    i18nVerifiedAriaLabel?: string
    i18nErrorAriaLabel?: string
    i18nWasmDisable?: string
}

export function Captcha({
    ref,
    id = 'cap',
    name = 'cap',
    endpoint,
    onSolve,
    onError,
    onReset,
    onProgress,
    onBlur,
    i18nInitial,
    i18nVerifying,
    i18nSolved,
    i18nError,
    i18nVerifyAriaLabel,
    i18nVerifyingAriaLabel,
    i18nVerifiedAriaLabel,
    i18nErrorAriaLabel,
    i18nWasmDisable
}: CaptchaProps): React.JSX.Element {
    const mountedRef = useRef<boolean>(false)
    const widgetRef = useRef<CapWidget | null>(null)

    useImperativeHandle<CapWidget | null, CapWidget | null>(
        ref,
        () => widgetRef.current
    )

    const handleSolve: CapSolveHandler = (e) => {
        onSolve?.(e.detail.token)
    }

    const handleError: CapErrorHandler = (e) => {
        onError?.(e.detail.message)
    }

    const handleReset: CapResetHandler = () => {
        onReset?.()
    }

    const handleProgress: CapProgressHandler = (e) => {
        onProgress?.(e.detail.progress)
    }

    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true
            loadModule()
        }

        const widget = widgetRef.current

        if (widget) {
            widget.addEventListener('solve', handleSolve)
            widget.addEventListener('error', handleError)
            widget.addEventListener('reset', handleReset)
            widget.addEventListener('progress', handleProgress)
        }

        return () => {
            if (widget) {
                widget.removeEventListener('solve', handleSolve)
                widget.removeEventListener('error', handleError)
                widget.removeEventListener('reset', handleReset)
                widget.removeEventListener('progress', handleProgress)
            }

            mountedRef.current = false
        }
    }, [
        widgetRef,
        mountedRef,
        handleSolve,
        handleError,
        handleReset,
        handleProgress
    ])

    return (
        <cap-widget
            id={id}
            ref={widgetRef}
            onBlur={onBlur}
            data-cap-hidden-field-name={name}
            data-cap-api-endpoint={endpoint}
            data-cap-i18n-initial-state={i18nInitial}
            data-cap-i18n-verifying-label={i18nVerifying}
            data-cap-i18n-solved-label={i18nSolved}
            data-cap-i18n-error-label={i18nError}
            data-cap-i18n-verify-aria-label={i18nVerifyAriaLabel}
            data-cap-i18n-verifying-aria-label={i18nVerifyingAriaLabel}
            data-cap-i18n-verified-aria-label={i18nVerifiedAriaLabel}
            data-cap-i18n-error-aria-label={i18nErrorAriaLabel}
            data-cap-i18n-wasm-disabled={i18nWasmDisable}
        />
    )
}
