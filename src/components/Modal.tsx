import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[660px] mx-4 p-6 border border-[#999] rounded-2xl">
        <h2 className="text-[22px] font-bold mb-6">{title}</h2>
        {children}
      </div>
    </div>
  )
}
