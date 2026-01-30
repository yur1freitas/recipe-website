import { cx } from 'tailwind-variants/utils'

import type { TypographyProps } from '../Typography'

import { Typography } from '../Typography'

export type CardTitleProps = TypographyProps.H3

export function CardTitle({
    className,
    children,
    ...props
}: CardTitleProps): React.JSX.Element {
    const classNames = cx('card-title', className)

    return (
        <Typography.H3 className={classNames} {...props}>
            {children}
        </Typography.H3>
    )
}
