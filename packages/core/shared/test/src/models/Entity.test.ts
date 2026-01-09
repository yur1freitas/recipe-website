import { expect, describe, it, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import type { EntityInput } from '~/models/Entity'

import { Entity } from '~/models/Entity'

type TestEntityInput = EntityInput & { name: string }

class TestEntity extends Entity<TestEntityInput> {
    name: string

    constructor(input: TestEntityInput) {
        super(input)

        this.name = input.name
    }

    get props() {
        return {
            id: this.id.value,
            name: this.name
        }
    }
}

describe('Entity', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma entidade', () => {
        const entity = new TestEntity({ name: faker.person.firstName() })

        expect(entity).toBeInstanceOf(Entity)
    })

    it('deve clonar uma entidade', () => {
        const entity = new TestEntity({ name: faker.person.firstName() })
        const clonedEntity = entity.clone()

        expect(entity).not.toBe(clonedEntity)
        expect(entity.id.value).toBe(clonedEntity.id.value)
    })

    it('deve clonar uma entidade passando novos parâmetros', () => {
        const [nameA, nameB] = faker.helpers.uniqueArray(
            () => faker.person.firstName(),
            2
        )

        const entity = new TestEntity({ name: nameA })
        const clonedEntity = entity.clone({ name: nameB })

        expect(entity).not.toBe(clonedEntity)

        expect(entity.name).not.toBe(clonedEntity.name)
        expect(entity.id.value).toBe(clonedEntity.id.value)
    })

    it('deve comparar se uma entidade é igual a outra', () => {
        const entity = new TestEntity({ name: faker.person.firstName() })
        const clonedEntity = entity.clone()

        const otherEntity = new TestEntity({ name: faker.person.firstName() })

        expect(entity.equals(entity)).toBeTruthy()
        expect(entity.equals(clonedEntity)).toBeTruthy()
        expect(entity.equals(otherEntity)).toBeFalsy()
    })
})
