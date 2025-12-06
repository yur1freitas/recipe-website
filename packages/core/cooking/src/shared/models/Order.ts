import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'

export const $orderSchema = z
    .number('O índice da ordem deve ser um número')
    .min(1, 'A menor índice possível é 1')
    .int('O índice da ordem deve ser um valor inteiro')

export const OrderValidator = new ZodValidator($orderSchema)

export class Order extends ValueObject<number> {
    constructor(value: number) {
        super(OrderValidator, value)
    }
}
