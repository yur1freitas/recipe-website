import { expect, it, describe, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randDifficulty } from '~mocks/randDifficulty'

import { Difficulty } from '~/recipe/models/Difficulty'
import { DIFFICULTY_NAMES } from '~/recipe/constants/difficultyNames'

describe('Difficulty', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma dificuldade', () => {
        const input = randDifficulty()
        const difficulty = new Difficulty(input)

        expect(difficulty.value).toBe(input)
    })

    it('deve lançar um erro se a dificuldade for inválida', () => {
        const input = randDifficulty({ testCase: 'invalid' })

        expect(() => new Difficulty(input)).toThrowError(
            'A dificuldade deve ser válida'
        )
    })

    it('deve formatar a dificuldade', () => {
        const input = randDifficulty()
        const unit = new Difficulty(input)

        expect(unit.format()).toBe(DIFFICULTY_NAMES[input])
    })
})
