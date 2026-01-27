import { cx } from 'tailwind-variants/utils'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

export type CollapsibleTriggerProps = BaseCollapsible.Trigger.Props

export function CollapsibleTrigger({
    className,
    ...props
}: CollapsibleTriggerProps): React.JSX.Element {
    const classNames = cx('collapsible-trigger', className)

    return <BaseCollapsible.Trigger className={classNames} {...props} />
}
