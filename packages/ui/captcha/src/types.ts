import type {
    CapErrorEvent,
    CapProgressEvent,
    CapResetEvent,
    CapSolveEvent,
    CapWidget
} from '@cap.js/widget'

export type CapSolveHandler = (event: CapSolveEvent) => void

export type CapErrorHandler = (event: CapErrorEvent) => void

export type CapResetHandler = (event: CapResetEvent) => void

export type CapProgressHandler = (event: CapProgressEvent) => void

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'cap-widget': React.DetailedHTMLProps<
                React.HTMLAttributes<CapWidget>,
                CapWidget
            >
        }
    }
}
