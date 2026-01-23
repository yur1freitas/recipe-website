import { useState } from 'react'

import { clamp } from '@utils/core/clamp'

export type SetStepFn = (step: number) => void
export type UpdateStepFn = (updater: (value: number) => number) => void

export interface UseStepReturn {
    step: number
    setStep: SetStepFn
    updateStep: UpdateStepFn
    reset: () => void
    nextStep: () => void
    prevStep: () => void
    canGoToNextStep: boolean
    canGoToPrevStep: boolean
}

export const MIN_STEP_VALUE = 0

export function useStep(
    maxStep: number = Number.MAX_SAFE_INTEGER
): UseStepReturn {
    const [currentStep, setCurrentStep] = useState(MIN_STEP_VALUE)

    const canGoToNextStep = currentStep <= maxStep
    const canGoToPrevStep = currentStep >= MIN_STEP_VALUE

    const setStep: SetStepFn = (value) =>
        setCurrentStep(clamp({ min: 1, max: maxStep, value }))

    const updateStep: UpdateStepFn = (updater) =>
        setCurrentStep((value) =>
            clamp({ min: MIN_STEP_VALUE, max: maxStep, value: updater(value) })
        )

    const reset = () => setCurrentStep(MIN_STEP_VALUE)

    const nextStep = () =>
        setCurrentStep((value) =>
            clamp({ min: MIN_STEP_VALUE, max: maxStep, value: value + 1 })
        )

    const prevStep = () =>
        setCurrentStep((value) =>
            clamp({ min: MIN_STEP_VALUE, max: maxStep, value: value - 1 })
        )

    return {
        step: currentStep,
        setStep,
        updateStep,
        reset,
        nextStep,
        prevStep,
        canGoToNextStep,
        canGoToPrevStep
    }
}
