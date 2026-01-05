import type { Time } from '@core/time'
import type { EntityInput, EntityProps } from '@core/shared'

import type { ToolInput } from '~/tool/models/Tool'
import type { StepInput } from '~/step/models/Step'
import type { IngredientInput } from '~/ingredient/models/Ingredient'

import type { DifficultyEnum } from '../constants/DifficultyEnum'

import z from 'zod'

import { idSchema, Entity, entitySchema, Id, List } from '@core/shared'

import { Tool, toolSchema } from '~/tool/models/Tool'
import { Step, stepSchema } from '~/step/models/Step'
import { nameSchema, Name } from '~/shared/models/Name'
import { descriptionSchema, Description } from '~/shared/models/Description'
import { Ingredient, ingredientSchema } from '~/ingredient/models/Ingredient'

import { preparationTimeSchema, PreparationTime } from './PreparationTime'
import { difficultySchema, Difficulty } from './Difficulty'

export interface RecipeInput extends EntityInput {
    authorId: string
    name: string
    description: string
    difficulty: DifficultyEnum
    preparationTime: Time
    tools: ToolInput[]
    steps: StepInput[]
    ingredients: IngredientInput[]
}

export type RecipeProps = EntityProps<RecipeInput>

export const recipeSchema = z.object({
    ...entitySchema.shape,
    authorId: idSchema,
    name: nameSchema,
    description: descriptionSchema,
    difficulty: difficultySchema,
    preparationTime: preparationTimeSchema,
    steps: z.array(stepSchema),
    tools: z.array(toolSchema),
    ingredients: z.array(ingredientSchema)
})

export class Recipe extends Entity<RecipeInput> {
    readonly authorId: Id

    readonly name: Name
    readonly description: Description
    readonly difficulty: Difficulty

    readonly preparationTime: PreparationTime

    readonly steps: List<Step>
    readonly tools: List<Tool>
    readonly ingredients: List<Ingredient>

    constructor(input: RecipeInput) {
        super(input)

        const {
            authorId,
            name,
            description,
            difficulty,
            preparationTime,
            tools,
            steps,
            ingredients
        } = input

        this.authorId = new Id(authorId)

        this.name = new Name(name)
        this.description = new Description(description)
        this.difficulty = new Difficulty(difficulty)

        this.preparationTime = new PreparationTime(preparationTime)

        this.tools = new List(tools.map((input) => new Tool(input)))
        this.steps = new List(steps.map((input) => new Step(input)))

        this.ingredients = new List(
            ingredients.map((input) => new Ingredient(input))
        )
    }

    get props(): RecipeProps {
        return {
            id: this.id.value,
            authorId: this.authorId.value,
            name: this.name.value,
            description: this.description.value,
            difficulty: this.difficulty.value,
            preparationTime: this.preparationTime.value,
            tools: this.tools.map((t) => t.props).toArray(),
            steps: this.steps.map((s) => s.props).toArray(),
            ingredients: this.ingredients.map((i) => i.props).toArray()
        }
    }
}
