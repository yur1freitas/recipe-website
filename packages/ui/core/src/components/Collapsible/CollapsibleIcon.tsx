import { ChevronRightIcon } from 'lucide-react'

export type CollapsibleIconProps = Omit<React.ComponentProps<'svg'>, 'children'>

export function CollapsibleIcon(
    props: CollapsibleIconProps
): React.JSX.Element {
    return (
        <span className='collapsible-trigger-icon'>
            <ChevronRightIcon aria-hidden={true} {...props} />
        </span>
    )
}
