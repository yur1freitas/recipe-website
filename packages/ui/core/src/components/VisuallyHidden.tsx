/**
 * @link https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
 */
const VISUALLY_HIDDEN_STYLES: React.CSSProperties = {
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
}

export type VisuallyHiddenProps = React.ComponentProps<'span'>

/**
 * @link https://github.com/radix-ui/primitives/blob/main/packages/react/visually-hidden/src/visually-hidden.tsx
 */
export function VisuallyHidden({
    children,
    style,
    ...props
}: VisuallyHiddenProps): React.JSX.Element {
    return (
        <span {...props} style={{ ...VISUALLY_HIDDEN_STYLES, ...style }}>
            {children}
        </span>
    )
}
