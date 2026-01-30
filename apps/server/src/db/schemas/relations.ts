import { relations } from 'drizzle-orm'

import { toolsTable } from './tools'
import { stepsTable } from './steps'
import { recipesTable } from './recipes'
import { ingredientsTable } from './ingredients'

export const stepsRelations = relations(stepsTable, ({ one }) => ({
    recipe: one(recipesTable, {
        fields: [stepsTable.recipeId],
        references: [recipesTable.id]
    })
}))

export const toolsRelations = relations(toolsTable, ({ one }) => ({
    recipe: one(recipesTable, {
        fields: [toolsTable.recipeId],
        references: [recipesTable.id]
    })
}))

export const ingredientsRelations = relations(ingredientsTable, ({ one }) => ({
    recipe: one(recipesTable, {
        fields: [ingredientsTable.recipeId],
        references: [recipesTable.id]
    })
}))

export const recipesRelations = relations(recipesTable, ({ many }) => ({
    tools: many(toolsTable),
    steps: many(stepsTable),
    ingredients: many(ingredientsTable)
}))
