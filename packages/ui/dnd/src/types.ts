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
