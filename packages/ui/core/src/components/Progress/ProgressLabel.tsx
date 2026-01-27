import { cx } from 'tailwind-variants/utils'
import { Progress as BaseProgress } from '@base-ui/react/progress'

export type ProgressLabelProps = BaseProgress.Label.Props

export function ProgressLabel({
    className,
    ...props
}: ProgressLabelProps): React.JSX.Element {
    const classNames = cx('progress-label', className)

    return <BaseProgress.Label className={classNames} {...props} />
}
