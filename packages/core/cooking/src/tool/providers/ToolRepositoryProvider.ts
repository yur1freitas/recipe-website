import type { Awaitable } from '@core/shared'

import type { Tool } from '../models/Tool'

export interface ToolRepositoryProvider {
    create(tool: Tool): Awaitable<boolean>
    update(tool: Tool): Awaitable<void>
    delete(id: string): Awaitable<void>
    findAll(): Awaitable<Tool[]>
    findById(id: string): Awaitable<Tool | null>
    findByRecipe(id: string): Awaitable<Tool[]>
    existsById(id: string): Awaitable<boolean>
}
