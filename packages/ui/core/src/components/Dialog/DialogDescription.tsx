import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { Typography } from '../Typography'

export type DialogDescriptionProps = BaseDialog.Description.Props

export function DialogDescription(
    props: DialogDescriptionProps
): React.JSX.Element {
    return <BaseDialog.Description {...props} render={Typography.Paragraph} />
}
