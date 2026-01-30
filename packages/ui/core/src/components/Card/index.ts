import type { CardTitleProps } from './CardTitle'
import type { CardRootProps } from './CardRoot'
import type { CardHeaderProps } from './CardHeader'
import type { CardFooterProps } from './CardFooter'
import type { CardDescriptionProps } from './CardDescription'
import type { CardContentProps } from './CardContent'
import type { CardActionProps } from './CardAction'

import { CardTitle } from './CardTitle'
import { CardRoot } from './CardRoot'
import { CardHeader } from './CardHeader'
import { CardFooter } from './CardFooter'
import { CardDescription } from './CardDescription'
import { CardContent } from './CardContent'
import { CardAction } from './CardAction'

export const Card = {
    Root: CardRoot,
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Content: CardContent,
    Footer: CardFooter,
    Action: CardAction
}

export namespace CardProps {
    export type Root = CardRootProps
    export type Header = CardHeaderProps
    export type Title = CardTitleProps
    export type Description = CardDescriptionProps
    export type Content = CardContentProps
    export type Footer = CardFooterProps
    export type Action = CardActionProps
}
