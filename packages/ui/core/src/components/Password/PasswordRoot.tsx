import { useEffect, useId, useState } from 'react'
import { cx } from 'tailwind-variants/utils'

import { PasswordContext } from '~/contexts/PasswordContext'

export interface PasswordRootProps extends React.ComponentProps<'div'> {
    id?: string
    hidden?: boolean
    className?: string
    children?: React.ReactNode[] | React.ReactNode
}

export function PasswordRoot({
    id,
    children,
    className,
    hidden = false
}: PasswordRootProps): React.JSX.Element {
    const classNames = cx('password', className)

    const [inputId, setInputId] = useState(useId())
    const [isVisible, setIsVisible] = useState(hidden)

    useEffect(() => {
        if (id) setInputId(id)
    }, [id])

    const toggleVisibility = () => setIsVisible((state) => !state)
    const isHidden = !isVisible

    const value = {
        inputId,
        setInputId,
        isHidden,
        isVisible,
        toggleVisibility
    }

    return (
        <PasswordContext value={value}>
            <div className={classNames}>{children}</div>
        </PasswordContext>
    )
}
