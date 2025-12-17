'use strict'

import { useSignal } from '@preact/signals'

export function useWatcher(value) {
    const signal = useSignal(value)
    signal.value = value
    return signal
}
