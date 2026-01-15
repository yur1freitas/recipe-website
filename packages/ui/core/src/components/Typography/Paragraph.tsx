import { cx } from 'tailwind-variants/utils'

export type ParagraphProps = React.ComponentProps<'p'>

export function Paragraph({
    className,
    ...props
}: ParagraphProps): React.JSX.Element {
    const classNames = cx('typography-p', className)

    return <p {...props} className={classNames} />
}
