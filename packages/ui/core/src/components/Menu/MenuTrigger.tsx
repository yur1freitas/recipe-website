import { Menu as BaseMenu } from '@base-ui/react/menu'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type MenuTriggerProps = BaseMenu.Trigger.Props & ButtonVariants

export function MenuTrigger(props: MenuTriggerProps): React.JSX.Element {
    return (
        <BaseMenu.Trigger
            {...props}
            render={(props) => <Button {...props} variant='outline' />}
        />
    )
}
