import { cx } from 'tailwind-variants/utils'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

export type CollapsiblePanelProps = BaseCollapsible.Panel.Props

export function CollapsiblePanel({
    className,
    ...props
}: CollapsiblePanelProps): React.JSX.Element {
    const classNames = cx('collapsible-panel', className)

    return <BaseCollapsible.Panel className={classNames} {...props} />
}
