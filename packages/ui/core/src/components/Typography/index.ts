import type { ParagraphProps } from './Paragraph'
import type { SmallProps } from './Small'
import type { ListProps } from './List'
import type { LinkProps } from './Link'
import type { H3Props } from './H3'
import type { H2Props } from './H2'
import type { H1Props } from './H1'

import { Paragraph } from './Paragraph'
import { Small } from './Small'
import { List } from './List'
import { Link } from './Link'
import { H3 } from './H3'
import { H2 } from './H2'
import { H1 } from './H1'

export const Typography = {
    H1,
    H2,
    H3,
    List,
    Link,
    Small,
    Paragraph
}

export namespace TypographyProps {
    export type H1 = H1Props
    export type H2 = H2Props
    export type H3 = H3Props
    export type List = ListProps
    export type Link = LinkProps
    export type Small = SmallProps
    export type Paragraph = ParagraphProps
}
