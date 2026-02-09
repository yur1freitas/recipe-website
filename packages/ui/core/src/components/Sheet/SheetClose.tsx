import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type SheetCloseProps = BaseDialog.Close.Props &
    ButtonVariants & { className?: string }

export function SheetClose(props: SheetCloseProps): React.JSX.Element {
    return <BaseDialog.Close render={Button} {...props} />
}
