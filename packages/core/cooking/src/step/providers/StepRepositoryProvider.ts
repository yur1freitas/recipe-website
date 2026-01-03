import type { Step } from '../models/Step'

export interface StepRepositoryProvider {
    create(step: Step): Promise<boolean>
    update(step: Step): Promise<void>
    delete(id: string): Promise<void>
    findAll(): Promise<Step[]>
    findById(id: string): Promise<Step | null>
    findByRecipe(id: string): Promise<Step[]>
    existsById(id: string): Promise<boolean>
}
