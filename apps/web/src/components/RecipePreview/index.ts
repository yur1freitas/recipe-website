import type { RecipePreviewToolsProps } from './RecipePreviewTools'
import type { RecipePreviewStepsProps } from './RecipePreviewSteps'
import type { RecipePreviewRootProps } from './RecipePreviewRoot'
import type { RecipePreviewPreparationTimeProps } from './RecipePreviewPreparationTime'
import type { RecipePreviewNameProps } from './RecipePreviewName'
import type { RecipePreviewIngredientsProps } from './RecipePreviewIngredients'
import type { RecipePreviewDifficultyProps } from './RecipePreviewDifficulty'
import type { RecipePreviewDescriptionProps } from './RecipePreviewDescription'

import { RecipePreviewTools } from './RecipePreviewTools'
import { RecipePreviewSteps } from './RecipePreviewSteps'
import { RecipePreviewRoot } from './RecipePreviewRoot'
import { RecipePreviewPreparationTime } from './RecipePreviewPreparationTime'
import { RecipePreviewName } from './RecipePreviewName'
import { RecipePreviewIngredients } from './RecipePreviewIngredients'
import { RecipePreviewDifficulty } from './RecipePreviewDifficulty'
import { RecipePreviewDescription } from './RecipePreviewDescription'

export const RecipePreview = {
    Root: RecipePreviewRoot,
    Name: RecipePreviewName,
    Description: RecipePreviewDescription,
    Difficulty: RecipePreviewDifficulty,
    PreparationTime: RecipePreviewPreparationTime,
    Ingredients: RecipePreviewIngredients,
    Tools: RecipePreviewTools,
    Steps: RecipePreviewSteps
}

export namespace RecipePreviewProps {
    export type Root = RecipePreviewRootProps
    export type Name = RecipePreviewNameProps
    export type Description = RecipePreviewDescriptionProps
    export type Difficulty = RecipePreviewDifficultyProps
    export type PreparationTime = RecipePreviewPreparationTimeProps
    export type Ingredients = RecipePreviewIngredientsProps
    export type Tools = RecipePreviewToolsProps
    export type Steps = RecipePreviewStepsProps
}
