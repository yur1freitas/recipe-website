import { relations } from 'drizzle-orm'

import { toolsTable } from './tools'
import { stepsTable } from './steps'
import { recipesTable } from './recipes'
import { ingredientsTable } from './ingredients'

export const stepsRelations = relations(stepsTable, ({ one }) => ({
    recipe: one(recipesTable)
}))

export const toolsRelations = relations(toolsTable, ({ one }) => ({
    recipe: one(recipesTable)
}))

export const ingredientsRelations = relations(ingredientsTable, ({ one }) => ({
    recipe: one(recipesTable)
}))

export const recipesRelations = relations(recipesTable, ({ many }) => ({
    tools: many(toolsTable),
    steps: many(stepsTable),
    ingredients: many(ingredientsTable)
}))
