import type { ScrollAreaRootProps } from './ScrollAreaRoot'
import type { ScrollAreaThumbProps } from './ScrollAreaThumb'
import type { ScrollAreaCornerProps } from './ScrollAreaCorner'
import type { ScrollAreaViewportProps } from './ScrollAreaViewport'
import type { ScrollAreaContentProps } from './ScrollAreaContent'
import type { ScrollAreaScrollbarProps } from './ScrollAreaScrollbar'

import { ScrollAreaRoot } from './ScrollAreaRoot'
import { ScrollAreaThumb } from './ScrollAreaThumb'
import { ScrollAreaCorner } from './ScrollAreaCorner'
import { ScrollAreaViewport } from './ScrollAreaViewport'
import { ScrollAreaContent } from './ScrollAreaContent'
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar'

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
