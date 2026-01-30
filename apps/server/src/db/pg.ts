import { drizzle } from 'drizzle-orm/node-postgres'

import { usersTable } from './schemas/users'
import { toolsTable } from './schemas/tools'
import { stepsTable } from './schemas/steps'
import {
    ingredientsRelations,
    recipesRelations,
    toolsRelations,
    stepsRelations
} from './schemas/relations'
import { recipesTable } from './schemas/recipes'
import { ingredientsTable } from './schemas/ingredients'

export const pg = drizzle(process.env.DATABASE_URL!, {
    casing: 'snake_case',
    schema: {
        recipesRelations,
        toolsRelations,
        stepsRelations,
        ingredientsRelations,
        users: usersTable,
        recipes: recipesTable,
        tools: toolsTable,
        steps: stepsTable,
        ingredients: ingredientsTable
    }
})
