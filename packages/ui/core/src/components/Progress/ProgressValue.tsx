import { cx } from 'tailwind-variants/utils'
import { Progress as BaseProgress } from '@base-ui/react/progress'

export type ProgressValueProps = BaseProgress.Value.Props

export function ProgressValue({
    className,
    ...props
}: ProgressValueProps): React.JSX.Element {
    const classNames = cx('progress-value', className)

    return <BaseProgress.Value className={classNames} {...props} />
}
