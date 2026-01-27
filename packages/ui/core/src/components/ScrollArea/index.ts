import type { ScrollAreaViewportProps } from './ScrollAreaViewport'
import type { ScrollAreaThumbProps } from './ScrollAreaThumb'
import type { ScrollAreaScrollbarProps } from './ScrollAreaScrollbar'
import type { ScrollAreaRootProps } from './ScrollAreaRoot'
import type { ScrollAreaCornerProps } from './ScrollAreaCorner'
import type { ScrollAreaContentProps } from './ScrollAreaContent'

import { ScrollAreaViewport } from './ScrollAreaViewport'
import { ScrollAreaThumb } from './ScrollAreaThumb'
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar'
import { ScrollAreaRoot } from './ScrollAreaRoot'
import { ScrollAreaCorner } from './ScrollAreaCorner'
import { ScrollAreaContent } from './ScrollAreaContent'

export const ScrollArea = {
    Root: ScrollAreaRoot,
    Corner: ScrollAreaCorner,
    Thumb: ScrollAreaThumb,
    Viewport: ScrollAreaViewport,
    Content: ScrollAreaContent,
    Scrollbar: ScrollAreaScrollbar
}

export namespace ScrollAreaProps {
    export type Root = ScrollAreaRootProps
    export type Corner = ScrollAreaCornerProps
    export type Thumb = ScrollAreaThumbProps
    export type Viewport = ScrollAreaViewportProps
    export type Content = ScrollAreaContentProps
    export type Scrollbar = ScrollAreaScrollbarProps
}
