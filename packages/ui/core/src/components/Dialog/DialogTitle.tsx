import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { Typography } from '../Typography'

export type DialogTitleProps = BaseDialog.Title.Props

export function DialogTitle(props: DialogTitleProps): React.JSX.Element {
    return <BaseDialog.Title {...props} render={Typography.H2} />
}
