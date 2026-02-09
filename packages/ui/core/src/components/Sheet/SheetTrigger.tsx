import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type SheetTriggerProps = BaseDialog.Trigger.Props & ButtonVariants

export function SheetTrigger(props: SheetTriggerProps): React.JSX.Element {
    return <BaseDialog.Trigger render={Button} {...props} />
}
