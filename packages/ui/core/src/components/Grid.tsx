'use client'

import { cx } from 'tailwind-variants/utils'
import { useMemo } from 'react'

import type { UseBreakpointInput } from '~/hooks/useBreakpoint'

import { useBreakpoint } from '~/hooks/useBreakpoint'

export type GridBreakpoints<T> = UseBreakpointInput<T>

export interface GridProps extends React.ComponentProps<'div'> {
    cols?: number | GridBreakpoints<number>
    rows?: number | GridBreakpoints<number>
}

export const resolveValue = (
    input: number | GridBreakpoints<number>
): GridBreakpoints<number> =>
    typeof input === 'number' ? { default: input } : input

export function Grid({
    cols = 1,
    rows = 1,
    style,
    children,
    className,
    ...props
}: GridProps): React.JSX.Element {
    const classNames = cx('grid', className)

    const { value: gridCols } = useBreakpoint<number>(resolveValue(cols))
    const { value: gridRows } = useBreakpoint<number>(resolveValue(rows))

    const styles = useMemo(
        () => ({
            '--grid-cols': gridCols,
            '--grid-rows': gridRows,
            ...style
        }),
        [gridCols, gridRows, style]
    )

    return (
        <div
            data-cols={gridCols}
            data-rows={gridRows}
            className={classNames}
            style={styles}
            {...props}
        >
            {children}
        </div>
    )
}
