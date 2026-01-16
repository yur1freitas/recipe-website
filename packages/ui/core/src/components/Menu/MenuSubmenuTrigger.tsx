import { Menu as BaseMenu } from '@base-ui/react/menu'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type MenuSubmenuTriggerProps = BaseMenu.SubmenuTrigger.Props &
    ButtonVariants

export function MenuSubmenuTrigger(
    props: MenuSubmenuTriggerProps
): React.JSX.Element {
    return <BaseMenu.SubmenuTrigger {...props} render={Button} />
}
