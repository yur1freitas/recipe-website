import { cx } from 'tailwind-variants/utils'
import { useEffect, useId, useState } from 'react'

import { PasswordContext } from '~/contexts/PasswordContext'

export interface PasswordRootProps extends React.ComponentProps<'div'> {
    id?: string
    visible?: boolean
    className?: string
    children?: React.ReactNode[] | React.ReactNode
}

export function PasswordRoot({
    id,
    visible,
    children,
    className
}: PasswordRootProps): React.JSX.Element {
    const classNames = cx('password', className)

    const [inputId, setInputId] = useState(useId())
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (id) setInputId(id)
    }, [id])

    useEffect(() => {
        setIsVisible(Boolean(visible))
    }, [visible])

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
