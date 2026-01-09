import { expect, describe, it, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randList } from '~mocks/randList'
import { randLength } from '~mocks/randLength'
import { randIndex } from '~mocks/randIndex'

import { List } from '~/collections/List'

describe('List', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma lista vazia', () => {
        const list = new List()

        expect(list.length).toBe(0)
    })

    it('deve instanciar uma lista com n valores', () => {
        const length = randLength(100)
        const input = randList({ length })

        const list = new List(input)

        expect(list.length).toBe(length)
    })

    it('deve retornar os índices da lista', () => {
        const input = randList()

        const list = new List(input)

        expect(list.keys).toStrictEqual(input.keys())
    })

    it('deve retornar os valores da lista', () => {
        const input = randList()

        const list = new List(input)

        expect(list.values).toStrictEqual(input.values())
    })

    it('deve converter uma lista para um array', () => {
        const input = randList()

        const list = new List(input)

        expect(list.toArray()).toStrictEqual(input)
    })

    it('deve retornar um valor da lista com base no índice', () => {
        const input = randList()

        const list = new List(input)

        expect.assertions(input.length)

        for (let i = 0; i < input.length; i++) {
            expect(list.get(i)).toBe(input[i])
        }
    })

    it('deve retornar nulo ao tentar pegar um valor com um índice fora dos limites da lista', () => {
        const length = randLength()
        const input = randList({ length })

        const list = new List(input)

        expect(list.get(-1)).toBeNull()
        expect(list.get(input.length)).toBeNull()
        expect(list.get(faker.number.float())).toBeNull()
    })

    it('deve clonar a lista ao adicionar um múltiplos valores únicos', () => {
        const songName = faker.music.songName()

        const list = new List()
        const newList = list.add(songName, songName, songName)

        expect(list.length).toBe(0)
        expect(newList.length).toBe(1)

        expect(list).not.toBe(newList)
    })

    it('deve clonar a lista ao adicionar múltiplos valores', () => {
        const songName = faker.music.songName()
        const genre = faker.music.genre()

        const list = new List()
        const newList = list.push(songName, songName, genre)

        expect(list.length).toBe(0)
        expect(newList.length).toBe(3)

        expect(list).not.toBe(newList)
    })

    it('deve clonar a lista ao inserir um valor em um índice específico', () => {
        const length = randLength()
        const input = randList({ length })
        const index = randIndex(length)

        const sample = faker.string.sample()

        const list = new List(input)
        const newList = list.insert(index, sample)

        expect(list.length).toBe(length)
        expect(list.get(index)).not.toBe(sample)

        expect(newList.length).toBe(length + 1)
        expect(newList.get(index)).toBe(sample)

        expect(list).not.toBe(newList)
    })

    it('deve retornar a própria instância ao tentar inserir um valor fora dos limites da lista', () => {
        const [value, ...input] = randList()

        const list = new List(input)
        const newList = list
            .insert(-1, value)
            .insert(input.length, value)
            .insert(faker.number.float(), value)

        expect(list.length).toBe(newList.length)
        expect(list).toBe(newList)
    })

    it('deve clonar a lista ao substituir um valor em um índice específico', () => {
        const length = randLength()
        const input = randList({ length })
        const index = randIndex(length)

        const sample = faker.string.sample()

        const list = new List(input)
        const newList = list.set(index, sample)

        expect(list.length).toBe(length)
        expect(list.get(index)).not.toBe(sample)

        expect(newList.length).toBe(length)
        expect(newList.get(index)).toBe(sample)

        expect(list).not.toBe(newList)
    })

    it('deve retornar a própria instância ao tentar substituir um valor fora dos limites da lista', () => {
        const [value, ...input] = randList()

        const list = new List(input)
        const newList = list
            .set(-1, value)
            .set(input.length, value)
            .set(faker.number.float(), value)

        expect(list.length).toBe(newList.length)

        expect(list).toBe(newList)
    })

    it('deve clonar a lista ao deletar um valor em um índice específico', () => {
        const length = randLength()
        const input = randList({ length, unique: true })
        const index = randIndex(length)

        const value = input[index]

        const list = new List(input)
        const newList = list.drop(index)

        expect(list.length).toBe(length)
        expect(list.get(index)).toBe(value)

        expect(newList.length).toBe(length - 1)
        expect(newList.get(index)).not.toBe(value)

        expect(list).not.toBe(newList)
    })

    it('deve retornar a própria instância ao tentar deletar um valor fora dos limites da lista', () => {
        const input = randList()

        const list = new List(input)
        const lists = [
            list.drop(-1),
            list.drop(input.length),
            list.drop(faker.number.float())
        ]

        expect.assertions(6)

        for (const l of lists) {
            expect(list.length).toBe(l.length)
            expect(list).toBe(l)
        }
    })

    it('deve clonar a lista ao trocar dois valores de lugar', () => {
        const length = randLength()
        const input = randList({ length })

        const a = randIndex(length)
        const b = randIndex(length)

        const valueA = input[a]
        const valueB = input[b]

        const list = new List(input)
        const newList = list.swap(a, b)

        expect(list.get(a)).toBe(valueA)
        expect(list.get(b)).toBe(valueB)

        expect(newList.get(a)).toBe(valueB)
        expect(newList.get(b)).toBe(valueA)

        expect(list).not.toBe(newList)
    })

    it('deve retornar a própria instância ao tentar trocar dois valores de fora dos limites da lista', () => {
        const length = randLength()
        const input = randList({ length })
        const index = randIndex(length)

        const list = new List(input)
        const lists = [
            list.swap(-1, index),
            list.swap(index, input.length),
            list.swap(faker.number.float(), index)
        ]

        expect.assertions(6)

        const arr = list.toArray()

        for (const l of lists) {
            expect(arr).toStrictEqual(l.toArray())
            expect(list).toBe(l)
        }
    })

    it('deve clonar a lista ao mover um valor para um índice específico', () => {
        const length = randLength()
        const input = randList({ length: 10 })

        const [a, b] = faker.helpers.uniqueArray(() => randIndex(length), 2)

        const valueA = input[a]
        const valueB = input[b]

        const list = new List(input)
        const newList = list.move(a, b)

        expect(list.get(a)).toBe(valueA)
        expect(list.get(b)).toBe(valueB)

        expect(newList.get(b)).toBe(valueA)

        // Se o índice de partida for maior que o de origem, o elemento A vai para ANTES do elemento B
        // Se o índice de partida for menor que o de origem, o elemento A vai para DEPOIS do elemento B
        const newIndexOfB =
            a >= b ? Math.min(length - 1, b + 1) : Math.max(0, b - 1)

        expect(newList.get(newIndexOfB)).toBe(valueB)

        expect(list).not.toBe(newList)
    })

    it('deve retornar a própria instância ao tentar mover um valor que está ou vai para fora dos limites da lista', () => {
        const length = randLength()
        const input = randList({ length })
        const index = randIndex(length)

        const list = new List(input)
        const lists = [
            list.move(-1, index),
            list.move(index, length),
            list.move(faker.number.float(), index)
        ]

        expect.assertions(6)

        const arr = list.toArray()

        for (const l of lists) {
            expect(arr).toStrictEqual(l.toArray())
            expect(list).toBe(l)
        }
    })

    it('deve clonar a lista ao mapeá-la', () => {
        const length = randLength()
        const input = randList({ length })

        const list = new List(input)
        const newList = list.map((value) => value.length)

        expect(list.length).toBe(length)
        expect(newList.length).toBe(length)

        expect(newList.toArray()).toStrictEqual(input.map((e) => e.length))

        expect(list).not.toBe(newList)
    })

    it('deve clonar a lista ao filtrá-la', () => {
        const input = randList()
        const minLength = randLength()

        const list = new List(input)
        const newList = list.filter((item) => item.length > minLength)

        expect(list.length).toBe(input.length)
        expect(newList.length).toBeLessThanOrEqual(input.length)

        expect(newList.toArray()).toStrictEqual(
            input.filter((item) => item.length > minLength)
        )

        expect(list).not.toBe(newList)
    })

    it('deve procurar um valor na lista', () => {
        const sample = faker.string.sample()
        const input = faker.helpers.shuffle([...randList(), sample])

        const list = new List(input)
        const result = list.find((item) => item === sample)

        expect(result).toBe(sample)
    })

    it('deve retornar nulo se o valor procurado não for achado na lista', () => {
        const input = randList()

        const list = new List(input)
        const result = list.find((value) => typeof value !== 'string')

        expect(result).toBeNull()
    })

    it('deve procurar o índice de um valor na lista', () => {
        const length = randLength()
        const input = randList({ length })
        const index = randIndex(length)

        const value = input[index]

        const list = new List(input)
        const result = list.findIndex((item) => item === value)

        expect(result).toBe(index)
    })

    it('deve clonar a lista ao organizá-la', () => {
        const input = randList()

        const list = new List(input)
        const newList = list.sort((a, b) => b.length - a.length)

        expect(list.toArray()).toStrictEqual(input)
        expect(newList.toArray()).toStrictEqual(
            input.toSorted((a, b) => b.length - a.length)
        )

        expect(list).not.toBe(newList)
    })

    it('deve verificar se o índice está dentro dos limites da lista', () => {
        const length = randLength()
        const input = randList({ length })

        const list = new List(input)

        expect(list.isInBounds(0)).toBeTruthy()
        expect(list.isInBounds(length - 1)).toBeTruthy()

        expect(list.isInBounds(-1)).toBeFalsy()
        expect(list.isInBounds(length)).toBeFalsy()
        expect(list.isInBounds(faker.number.float())).toBeFalsy()
    })

    it('deve verificar se o índice está fora dos limites da lista', () => {
        const length = randLength()
        const input = randList({ length })

        const list = new List(input)

        expect(list.isNotInBounds(0)).toBeFalsy()
        expect(list.isNotInBounds(length - 1)).toBeFalsy()

        expect(list.isNotInBounds(-1)).toBeTruthy()
        expect(list.isNotInBounds(length)).toBeTruthy()
        expect(list.isNotInBounds(faker.number.float())).toBeTruthy()
    })

    it('deve iterar a lista', () => {
        const length = randLength()
        const input = randList({ length })

        const list = new List(input)

        expect.assertions(length)

        for (const item of list) {
            expect(item).toBeDefined()
        }
    })
})
