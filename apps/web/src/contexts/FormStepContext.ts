import { createContext } from 'react'

import type { UseStepReturn } from '@ui/core/hooks/useStep'

export type FormStepContextValue = UseStepReturn

export const FormStepContext = createContext<UseStepReturn | null>(null)
