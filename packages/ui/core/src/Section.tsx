import { cx } from 'tailwind-variants/utils'

export type SectionProps = React.ComponentProps<'section'>

export default function Section({
    className,
    ...props
}: SectionProps): React.JSX.Element {
    const classNames = cx('section', className)

    return <section {...props} className={classNames} />
}
