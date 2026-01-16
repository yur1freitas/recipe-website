import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type DialogTriggerProps = BaseDialog.Trigger.Props & ButtonVariants

export function DialogTrigger(props: DialogTriggerProps): React.JSX.Element {
    return <BaseDialog.Trigger {...props} render={Button} />
}
