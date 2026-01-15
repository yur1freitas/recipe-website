import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

import { cx } from 'tailwind-variants/utils'

export type NumberFieldScrubAreaCursorProps =
    BaseNumberField.ScrubAreaCursor.Props & { className?: string }

export function NumberFieldScrubAreaCursor({
    className,
    ...props
}: NumberFieldScrubAreaCursorProps): React.JSX.Element {
    const classNames = cx('number-field-scrub-area-cursor', className)

    return (
        <BaseNumberField.ScrubAreaCursor {...props} className={classNames}>
            <svg
                width='26'
                height='14'
                viewBox='0 0 24 14'
                fill='black'
                stroke='white'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
            </svg>
        </BaseNumberField.ScrubAreaCursor>
    )
}
