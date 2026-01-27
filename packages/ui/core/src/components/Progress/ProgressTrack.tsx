import { cx } from 'tailwind-variants/utils'
import { Progress as BaseProgress } from '@base-ui/react/progress'

export type ProgressTrackProps = BaseProgress.Track.Props

export function ProgressTrack({
    className,
    ...props
}: ProgressTrackProps): React.JSX.Element {
    const classNames = cx('progress-track', className)

    return <BaseProgress.Track className={classNames} {...props} />
}
