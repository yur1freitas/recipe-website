import { cx } from 'tailwind-variants/utils'
import { Progress as BaseProgress } from '@base-ui/react/progress'

export type ProgressRootProps = BaseProgress.Root.Props

export function ProgressRoot({
    className,
    ...props
}: ProgressRootProps): React.JSX.Element {
    const classNames = cx('progress', className)

    return <BaseProgress.Root className={classNames} {...props} />
}
