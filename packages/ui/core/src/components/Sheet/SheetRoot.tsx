import { Dialog as BaseDialog } from '@base-ui/react/dialog'

export type SheetRootProps = BaseDialog.Root.Props

export function SheetRoot(props: SheetRootProps) {
    return <BaseDialog.Root {...props} />
}
