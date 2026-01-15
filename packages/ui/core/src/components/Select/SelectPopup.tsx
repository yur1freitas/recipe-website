import { Select as BaseSelect } from '@base-ui/react/select'

import { cx } from 'tailwind-variants/utils'

export type SelectPopupProps = BaseSelect.Popup.Props & { className?: string }

export function SelectPopup({
    className,
    ...props
}: SelectPopupProps): React.JSX.Element {
    const classNames = cx('select-popup', className)

    return <BaseSelect.Popup {...props} className={classNames} />
}
