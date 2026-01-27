import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randStep } from '~mocks/randStep'
import { randOrder } from '~mocks/randOrder'
import { randDescription } from '~mocks/randDescription'

import { ValidatorError } from '@core/shared'

import { Step } from '~/step/models/Step'

describe('Step', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma etapa', () => {
        const input = randStep()
        const step = new Step(input)

        expect(step.props).toStrictEqual(input)
    })

    it('deve formatar uma etapa', () => {
        const step = new Step({ order: 1, description: 'Prepare o molho' })

        expect(step.format()).toBe('1. Prepare o molho')
    })

    it('deve lançar um erro se o a ordem for inválida', () => {
        const input = randStep({
            order: randOrder({ testCase: 'float' })
        })

        expect(() => new Step(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se a descrição for inválida', () => {
        const input = randStep({
            description: randDescription({ testCase: 'empty' })
        })

        expect(() => new Step(input)).toThrowError(ValidatorError)
    })
})
