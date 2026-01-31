import type { ButtonProps as BaseButtonProps } from '@base-ui/react/button'

import { cx } from 'tailwind-variants/utils'
import { Button as BaseButton } from '@base-ui/react/button'

import { useSearchContext } from '~/hooks/useSearchContext'

export type SearchCancelButtonProps = BaseButtonProps

export function SearchCancelButton({
    className,
    onClick,
    ...props
}: SearchCancelButtonProps): React.JSX.Element {
    const classNames = cx('search-cancel-button', className)

    const { inputId, isDirty, handleValueClear } = useSearchContext()

    const _onClick: BaseButtonProps['onClick'] = (event) => {
        handleValueClear()
        onClick?.(event)
    }

    return (
        <>
            {isDirty && (
                <BaseButton
                    aria-controls={inputId}
                    className={classNames}
                    onClick={_onClick}
                    {...props}
                />
            )}
        </>
    )
}
