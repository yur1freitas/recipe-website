import { Field as BaseField } from '@base-ui/react'

import type { PasswordProps } from '../Password'

import { Password } from '../Password'

export type FieldPassworProps = PasswordProps.Input & BaseField.Control.Props

export function FieldPassword(props: FieldPassworProps): React.JSX.Element {
    return (
        <Password.Root>
            <Password.Input {...props} render={<BaseField.Control />} />
            <Password.ToggleButton>
                <Password.ToggleButtonIcon />
            </Password.ToggleButton>
        </Password.Root>
    )
}
