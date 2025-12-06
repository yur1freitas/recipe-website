import type { EntityInput, EntityProps } from '@core/shared'
import { Entity, Id, List } from '@core/shared'

import { Time } from '@core/time'

import { Ingredient, IngredientInput } from '~/ingredient/models/Ingredient'
import { Description } from '~/shared/models/Description'
import { Name } from '~/shared/models/Name'
import { Step, StepInput } from '~/step/models/Step'
import { Tool, ToolInput } from '~/tool/models/Tool'

import { DifficultyEnum } from '../constants/DifficultyEnum'
import { Difficulty } from './Difficulty'
import { PreparationTime } from './PreparationTime'

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

        this.tools = new List(tools.map(input => new Tool(input)))
        this.steps = new List(steps.map(input => new Step(input)))

        this.ingredients = new List(
            ingredients.map(input => new Ingredient(input))
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
            tools: this.tools.map(t => t.props).toArray(),
            steps: this.steps.map(s => s.props).toArray(),
            ingredients: this.ingredients.map(i => i.props).toArray()
        }
    }
}
