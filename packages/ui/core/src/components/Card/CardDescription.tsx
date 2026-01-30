import { cx } from 'tailwind-variants/utils'

import type { TypographyProps } from '../Typography'

import { Typography } from '../Typography'

export type CardDescriptionProps = TypographyProps.Paragraph

export function CardDescription({
    className,
    children,
    ...props
}: CardDescriptionProps): React.JSX.Element {
    const classNames = cx('card-description', className)

    return (
        <Typography.Paragraph className={classNames} {...props}>
            {children}
        </Typography.Paragraph>
    )
}
