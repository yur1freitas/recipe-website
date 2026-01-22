import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cx } from 'tailwind-variants/utils'

export type ProgressIndicatorProps = BaseProgress.Indicator.Props

export function ProgressIndicator({
    className,
    ...props
}: ProgressIndicatorProps): React.JSX.Element {
    const classNames = cx('progress-indicator', className)

    return <BaseProgress.Indicator className={classNames} {...props} />
}
