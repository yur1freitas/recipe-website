'use strict'

import { createPortal } from 'preact/compat'
import { useSignalRef } from '@preact/signals/utils'
import { useSignalEffect } from '@preact/signals'

import { useDropdown } from './DropdownRoot.js'
import { html } from '../html.js'

const updatePosition = (target, dropdown) => {
    const targetRect = target.getBoundingClientRect()
    const dropdownRect = dropdown.getBoundingClientRect()

    const absoluteTop = window.scrollY + targetRect.height + targetRect.top
    const absoluteLeft = window.scrollX + targetRect.width + targetRect.left

    const isOverflowX = absoluteLeft + dropdownRect.width > window.innerWidth
    const isOverflowY = absoluteTop + dropdownRect.height > window.innerHeight

    dropdown.style.position = 'absolute'

    if (isOverflowX) {
        const absoluteRight = window.scrollX + targetRect.x - dropdownRect.width

        dropdown.style.left = `${absoluteRight}px`
    } else {
        dropdown.style.left = `${absoluteLeft}px`
    }

    if (isOverflowY) {
        const absoluteBottom =
            window.scrollY + targetRect.y - dropdownRect.height

        dropdown.style.top = `${absoluteBottom}px`
    } else {
        dropdown.style.top = `${absoluteTop}px`
    }
}

const ee = new Set()

export const DropdownContent = ({ children }) => {
    const { triggerRef, isOpened, close } = useDropdown()

    const dropdownRef = useSignalRef(null)

    const onClickOutside = (e) => {
        const target = e.target
        const allowedElements = [dropdownRef.current, triggerRef.current]

        if (!allowedElements.includes(target)) {
            close()
        }
    }

    useSignalEffect(() => {
        if (dropdownRef.current && triggerRef.current && isOpened.value) {
            updatePosition(triggerRef.current, dropdownRef.current)

            window.addEventListener('click', onClickOutside)
            window.addEventListener('resize', onClickOutside)
        }

        return () => {
            window.removeEventListener('resize', onClickOutside)
            window.removeEventListener('click', onClickOutside)
        }
    })

    if (isOpened.value) {
        return createPortal(
            html`
            <div id="dropdown" ref=${dropdownRef}>
                <div className="dropdown-content">
                    ${children}
                </div>
            </div>`,
            document.body
        )
    }

    return null
}
