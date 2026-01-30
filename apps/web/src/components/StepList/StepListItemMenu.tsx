import { EllipsisVerticalIcon } from 'lucide-react'

import { Menu } from '@ui/core/Menu'
import { Icon } from '@ui/core/Icon'

export interface StepListItemMenuProps {
    onItemEdit?: React.MouseEventHandler<HTMLElement>
    onItemDelete?: React.MouseEventHandler<HTMLElement>
}

export function StepListItemMenu({
    onItemEdit,
    onItemDelete
}: StepListItemMenuProps) {
    return (
        <Menu.Root>
            <Menu.Trigger size='icon' variant='ghost'>
                <Icon label='Menu de Opções'>
                    <EllipsisVerticalIcon />
                </Icon>
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner>
                    <Menu.Popup>
                        <Menu.Arrow />
                        <Menu.Item onClick={onItemEdit}>Editar</Menu.Item>
                        <Menu.Item onClick={onItemDelete}>Deletar</Menu.Item>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    )
}
