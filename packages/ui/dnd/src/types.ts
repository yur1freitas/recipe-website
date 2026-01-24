import type {
    DragAbortEvent,
    DragCancelEvent,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    DragStartEvent,
    DragPendingEvent
} from '@dnd-kit/core'

export namespace DragEvent {
    export type Abort = DragAbortEvent
    export type Cancel = DragCancelEvent
    export type End = DragEndEvent
    export type Move = DragMoveEvent
    export type Over = DragOverEvent
    export type Start = DragStartEvent
    export type Pending = DragPendingEvent
}

export namespace DragHandler {
    export type Abort = (event: DragAbortEvent) => void
    export type Cancel = (event: DragCancelEvent) => void
    export type End = (event: DragEndEvent) => void
    export type Move = (event: DragMoveEvent) => void
    export type Over = (event: DragOverEvent) => void
    export type Start = (event: DragStartEvent) => void
    export type Pending = (event: DragPendingEvent) => void
}
