'use client'

import { cx } from 'tailwind-variants/utils'
import { useMemo } from 'react'

export interface GridProps extends React.ComponentProps<'div'> {
    cols?: number
    rows?: number
}

export function Grid({
    cols = 1,
    rows = 1,
    style,
    children,
    className,
    ...props
}: GridProps): React.JSX.Element {
    const classNames = cx('grid', className)

    const styles = useMemo(
        () => ({
            '--grid-cols': cols,
            '--grid-rows': rows,
            ...style
        }),
        [cols, rows, style]
    )

    return (
        <div
            data-cols={cols}
            data-rows={rows}
            className={classNames}
            style={styles}
            {...props}
        >
            {children}
        </div>
    )
}
