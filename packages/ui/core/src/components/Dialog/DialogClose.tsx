import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { ButtonVariants } from '../Button'
import { Button } from '../Button'

export type DialogCloseProps = BaseDialog.Close.Props &
    ButtonVariants & { className?: string }

export function DialogClose(props: DialogCloseProps): React.JSX.Element {
    return <BaseDialog.Close {...props} render={Button} />
}
