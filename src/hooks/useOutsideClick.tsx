import { MutableRefObject, useEffect, useRef, useState } from 'react'

export function useOutsideClick(ref: MutableRefObject<HTMLElement | null>, handler: () => any) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Element)) {
        handler()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
