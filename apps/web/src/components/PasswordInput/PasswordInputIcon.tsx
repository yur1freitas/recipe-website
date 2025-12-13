import { Eye, EyeClosed } from 'lucide-react'

import { usePasswordInput } from './PasswordInputRoot'

export interface PasswordInputIconProps {
    visible: React.JSX.Element
    hidden: React.JSX.Element
}

export function PasswordInputIcon(): React.JSX.Element {
    const { isVisible } = usePasswordInput()

    return isVisible ? <Eye /> : <EyeClosed />
}
