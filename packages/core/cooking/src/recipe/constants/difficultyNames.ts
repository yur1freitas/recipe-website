import { DifficultyEnum } from './DifficultyEnum'

export type DifficultyNames = Readonly<Record<DifficultyEnum, string>>

export const DIFFICULTY_NAMES: DifficultyNames = {
    [DifficultyEnum.EASY]: 'Fácil',
    [DifficultyEnum.MEDIUM]: 'Médio',
    [DifficultyEnum.HARD]: 'Difícil'
}
