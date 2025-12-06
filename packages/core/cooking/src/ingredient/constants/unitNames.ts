import { UnitEnum } from './UnitEnum'

export interface UnitName {
    readonly singular: string
    readonly plural: string
}

export type UnitNames = Readonly<Record<UnitEnum, UnitName>>

export const UNIT_NAMES: UnitNames = {
    [UnitEnum.DROP]: {
        singular: 'gota',
        plural: 'gotas'
    },
    [UnitEnum.PINCH]: {
        singular: 'pitada',
        plural: 'pitadas'
    },
    [UnitEnum.TEA_SPON]: {
        singular: 'colher de chá',
        plural: 'colheres de chá'
    },
    [UnitEnum.TABLE_SPOON]: {
        singular: 'colher de sopa',
        plural: 'colheres de sopa'
    },
    [UnitEnum.DESSERT_SPOON]: {
        singular: 'colher de sobremesa',
        plural: 'colheres de sobremesa'
    },
    [UnitEnum.SALT_SPOON]: {
        singular: 'colher de sal',
        plural: 'colheres de sal'
    },
    [UnitEnum.GRAM]: {
        singular: 'grama',
        plural: 'gramas'
    },
    [UnitEnum.MILLIGRAM]: {
        singular: 'miligrama',
        plural: 'miligramas'
    },
    [UnitEnum.KILOGRAM]: {
        singular: 'quilograma',
        plural: 'quilogramas'
    },
    [UnitEnum.LITRE]: {
        singular: 'litro',
        plural: 'litros'
    },
    [UnitEnum.MILLILITRE]: {
        singular: 'mililitro',
        plural: 'mililitros'
    },
    [UnitEnum.CUP]: {
        singular: 'xícara',
        plural: 'xícaras'
    }
}
