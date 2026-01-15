import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randAmount } from '~mocks/randAmount'
import { randTool } from '~mocks/randTool'
import { randName } from '~mocks/randName'

import { ValidatorError } from '@core/shared'

import { Tool } from '~/tool/models/Tool'

describe('Tool', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um utensílio', () => {
        const input = randTool()
        const tool = new Tool(input)

        expect(tool.props).toStrictEqual(input)
    })

    it('deve lançar um erro se o nome for inválido', () => {
        const input = randTool({
            name: randName({ testCase: 'invalid-chars' })
        })

        expect(() => new Tool(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se a quantidade for inválida', () => {
        const input = randTool({
            amount: randAmount({ testCase: 'negative' })
        })

        expect(() => new Tool(input)).toThrowError(ValidatorError)
    })

    it('deve formatar as informações do utensílio', () => {
        const input = randTool()
        const tool = new Tool(input)

        expect(tool.format()).toBe(`${input.amount} ${input.name}`)
    })
})
